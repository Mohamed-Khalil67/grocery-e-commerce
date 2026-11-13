# SSR in Angular 22 — notes from FreshCart

Reference for adding server-side rendering (SSR) to an Angular project. Everything here was done and checked in this project.

## 1. What SSR is, in one minute

| Mode | HTML is built | Needs a Node server |
|---|---|---|
| **Client** (CSR) | in the browser | no |
| **Server** (SSR) | on the server, on every request | yes |
| **Prerender** (SSG) | once, at `ng build` | no |

Without SSR the browser receives `<app-root></app-root>` (empty) and JavaScript fills it in.
With SSR the browser receives the finished page, then Angular **hydrates** it (reuses the HTML and makes it interactive).

Why use it: faster first paint, search engines see real content.

## 2. Add it

```bash
ng add @angular/ssr
```

It creates / changes:

| File | Job |
|---|---|
| `src/main.server.ts` | starts the app on the **server** (like `main.ts` does in the browser) |
| `src/app/app.config.server.ts` | server-only config, merged with `app.config.ts` |
| `src/app/app.routes.server.ts` | says how each URL is rendered (Server / Client / Prerender) |
| `src/server.ts` | small Express server that renders pages and serves static files |
| `app.config.ts` | adds `provideClientHydration()` |
| `angular.json` | adds `server`, `outputMode: "server"`, `ssr.entry`, `security.allowedHosts` |
| `package.json` | adds `@angular/ssr`, `@angular/platform-server`, `express`, `@types/express`, script `serve:ssr:<name>` |

### If `ng add` fails with a peer-dependency error (ERESOLVE)

Angular packages pin each other to the **exact same version**. If your installed packages are older than the newest patch (e.g. `core 22.2.4` while `@angular/ssr` wants 22.2.6+), npm cannot resolve it.

What worked here:

1. In `package.json`, set **all** `@angular/*` packages to the same latest patch (and `@angular/build`, `@angular/cli` to theirs).
2. Delete `node_modules` and `package-lock.json`, then run `npm install`.
3. Run `ng add @angular/ssr` again.

What did **not** work: `ng update @angular/core @angular/cli` (it wiped `node_modules` and failed to reinstall), and `npm install pkg@version` one package at a time.

Check versions first with: `npm ls @angular/core @angular/ssr`.

## 3. How the files fit together

```text
app.config.ts          base: router, HTTP + interceptors, hydration   (used by browser AND server)
        +
app.config.server.ts   provideServerRendering(withRoutes(serverRoutes))  (server only)
        =
config                 used by main.server.ts
```

```ts
// app.config.server.ts (generated, rarely edited)
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};
export const config = mergeApplicationConfig(appConfig, serverConfig);
```

Rule: anything both sides need (interceptors, router options) goes in `app.config.ts`. The server gets it through the merge.

Request flow:

```text
browser asks /products
  → server.ts receives it
  → main.server.ts starts the Angular app for that URL
  → Angular builds the HTML  → server sends it
  → browser loads main.js (main.ts) → hydration → page is interactive
```

## 4. Choose how each page renders — `app.routes.server.ts`

```ts
export const serverRoutes: ServerRoute[] = [
  // user-specific pages: the server can't read the logged-in user's token
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'checkout/:cartId', renderMode: RenderMode.Client },
  // everything else: render on the server
  { path: '**', renderMode: RenderMode.Server },
];
```

- The router uses the **first rule that matches**, so specific paths go first and `**` goes last.
- Server paths must match the client route paths (`checkout/:cartId`).
- Which mode:
  - public, changing data (home, products, brands) → `Server`
  - depends on the logged-in user (cart, profile, orders) → `Client`
  - never changes (About) → `Prerender`

### Gotcha: Prerender and route parameters

The generated default is `{ path: '**', renderMode: RenderMode.Prerender }`. `ng build` then **fails** for every route with a parameter:

```text
The 'products/:id' route uses prerendering and includes parameters,
but 'getPrerenderParams' is missing.
```

Fix: use `Server` or `Client` for those routes, or give the route a `getPrerenderParams()` that returns all ids at build time. Simplest: use only Server and Client.

## 5. The one rule of SSR code: the server is not a browser

Node has no `window`, `document`, `localStorage`. Touching them while rendering on the server crashes the page.

```ts
// BAD (crashes on the server)
readonly token = signal(localStorage.getItem('userToken') ?? undefined);

// GOOD
private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

private read(key: string): string | undefined {
  return this.isBrowser ? (localStorage.getItem(key) ?? undefined) : undefined;
}
```

Only guard code that runs **during rendering** (service constructors, templates, `ngOnInit`). Code that runs after a click (`saveSession`, `signOut`) only ever runs in the browser.

Other safe options:

```ts
constructor() {
  afterNextRender(() => {
    // runs only in the browser, after the first render
    console.log(window.innerWidth);
  });
}
```

and inject `DOCUMENT` instead of using the global `document`.

## 6. Hydration mismatch (the real problem with logged-in users)

Hydration needs the server HTML and the browser's first render to be identical.

```text
server (can't read localStorage):  navbar says "Sign In"
browser (finds a token):           navbar says "Hi, Ahmed"   ← mismatch
```

For logged-in users Angular warns / redraws. That is why user-specific pages are `Client`.
Real fix for later: set the auth state **after** hydration (e.g. inside `afterNextRender`) so the first browser render also says "Sign In", then it updates.

## 7. Run and verify

```bash
ng serve                                      # dev server also renders on the server
ng build                                      # builds browser + server
node dist/<project>/server/server.mjs         # production server on http://localhost:4000
```

Verify with **View Page Source** (not Inspect — Inspect shows the live DOM, which is always filled):

```html
<app-root ng-version="22.2.6" ngh="8" ng-server-context="ssr">
   ...the real page HTML is here...
</app-root>
```

- `ng-server-context="ssr"` → built on the server (`ssg` = prerendered)
- empty `<app-root></app-root>` → client-rendered (or a dev server started before SSR was added: restart `ng serve`)
- the browser console shows `Angular hydrated N component(s)…` when hydration worked

Quick check from the terminal: `curl localhost:4000/login`.

Other markers in the HTML: `ngh="…"` (hydration ids), `jsaction="click:;"` and `ng-event-dispatch-contract` (clicks before JS loads are replayed), `<script id="ng-state">` (transfer cache: API data the server already fetched, so the browser does not ask again).

## 8. Things that bit us

| Problem | Cause | Fix |
|---|---|---|
| `ng add` ERESOLVE | Angular packages not on the same patch | align versions, reinstall (section 2) |
| `ng build`: `getPrerenderParams is missing` | `Prerender` on routes with `:id` | use `Server` / `Client` (section 4) |
| Every page crashes on the server | `localStorage` read in a service constructor | `isPlatformBrowser` guard (section 5) |
| Production server answers 400 on `localhost` | `security.allowedHosts: []` | add the host, e.g. `["localhost"]`; for deployment add the real domain (no wildcard) |
| View-source shows empty `<app-root>` | dev server started before SSR was added | restart `ng serve` |
| Logged-in navbar flashes "Sign In" | hydration mismatch (section 6) | set auth state after hydration |
| Git deploy failed on Vercel | new files were never committed (build worked locally only) | `git status`, commit untracked files |

## 9. Checklist for a new project

1. `ng add @angular/ssr` (fix versions first if it complains)
2. Edit `app.routes.server.ts`: user pages `Client`, the rest `Server`
3. Search the code for `localStorage`, `sessionStorage`, `window`, `document` and guard each one
4. `ng build`, then run `node dist/<project>/server/server.mjs`
5. View page source on one server page and one client page
6. Add the production domain to `allowedHosts` before deploying

Not tested in this project: deploying the SSR build to Vercel, and logged-in hydration.
