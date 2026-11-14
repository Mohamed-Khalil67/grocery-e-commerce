# Notes — how the basics are built (carried over from the social-media project)

Each section: **what it is → how it was done in social-media → how it's done here (Angular 22 best practice) → why.**
Read these before touching the matching TODO.

---

## 1. One layout (like the demo)

The demo shows login, sign-up and 404 inside the normal store layout (navbar + footer), so there is a single
`MainLayoutComponent` with a `<router-outlet>`. Auth pages are normal children protected by `guestGuard`.
(social-media had a separate AuthLayout — a layout is just a component with an outlet; both ways work.)

- Every page uses `loadComponent: () => import(...)` → each page is its own JS chunk.
- Private pages are grouped under a **componentless** `{ path: , canActivate: [authGuard], children: [...] }`.
- `**` (404) is the last child, so it renders inside the layout too.

## 2. Guards

**What:** a function the router calls before activating a route. Return `true` (go) or a `UrlTree` (redirect).

```ts
export const authGuard: CanActivateFn = () =>
  inject(AuthService).isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
```

- social-media read `localStorage` directly in the guard. The guard asks `AuthService`, which keeps the token in `localStorage` and in a signal.
- authGuard redirects to `/login`; after signing in, LoginComponent goes to `/`.
- "Keep me signed in": checked → token in `localStorage`, unchecked → `sessionStorage` (read from both, cleared from both).
- `guestGuard` is the mirror: logged-in users cannot see login/signup.

## 3. Interceptors

**What:** functions every HttpClient request passes through. Registered once in `app.config.ts`:

```ts
provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor, loadingInterceptor, errorInterceptor]))
```

| Interceptor | Job | Detail worth remembering |
|---|---|---|
| base-url | `'/products'` → full API URL | only touches URLs starting with `/` |
| auth | adds `token` header | Route API wants a raw `token` header, not `Authorization: Bearer`. Add an origin check the day you call another site |
| loading | show / hide the spinner | `finalize()` runs on success, error AND cancel. |
| error | every failure → toast | **re-throws** the error so the page can still show its own message |

- Requests are immutable → `req.clone({ setHeaders: { token } })`.
- **Order matters**: base-url first so the others see the full URL.
- Same as social-media: `ngx-spinner` (`<ngx-spinner>` in app.html, `show()` / `hide()` in the interceptor).

## 4. Auth service + state with signals

```ts
readonly token = signal<string | undefined>(localStorage.getItem(TOKEN_KEY) ?? undefined);
readonly isLoggedIn = computed(() => this.token() !== undefined);
```

- Only the service writes (`saveSession`, `signOut`). Navbar, guards and the interceptor just read.
- Because it's a signal, the navbar switches from "Login/Register" to the account menu **by itself** after login.
- social-media returned `Observable<any>`. Here every call is typed: `http.post<AuthResponse>(...)` (AGENTS.md rule).

## 5. Forms — Signal Forms (new in v21/v22) instead of Reactive Forms

Same login form, two APIs:

| Reactive Forms (social-media) | Signal Forms (here) |
|---|---|
| `new FormGroup({ email: new FormControl('') })` | `model = signal({ email: '' })` + `form(model, rules)` |
| `Validators.required, Validators.email` | `required(path.email)`, `email(path.email)` |
| `[formGroup]` + `formControlName="email"` | `[formField]="loginForm.email"` |
| `form.get('email')?.touched` | `loginForm.email().touched()` |
| `form.get('email')?.errors?.['required']` | `@for (e of loginForm.email().errors(); …) {{ e.message }}` |
| `if (form.valid) … else markAllAsTouched()` | `submit(form, async () => …)` does both |
| `isLoading = true/false` by hand | `loginForm().submitting()` |
| custom group validator for "passwords match" | `validate(path.rePassword, ({ value, valueOf }) => …)` |

Rules: never `null` in the model (`''`, `0`, `[]`), call a field to get its state (`form.email()`),
don't put `[disabled]`/`[value]` on an input that has `[formField]`.
`submit()` wants a Promise → `await firstValueFrom(this.auth.signIn(...))`.

## 6. Errors from the API

The **error interceptor** is the one place that shows API errors: it calls
`core/utils/api-error.ts → getApiErrorMessage(err)` (handles both Route API shapes, `{ message }` and
validation `{ errors: { msg } }`, by **narrowing `unknown`** — no `any`, no `as`) and shows the text with
`ToastService.error()`. Pages don't format errors; their `catch` only stops what they were doing.

## 7. Reading data: HttpClient vs httpResource

- **Mutations** (POST/PUT/DELETE) → service method with `HttpClient`, returns `Observable<T>`.
- **Reads that depend on a signal** (route `:id`, page number, search) → `httpResource` in the component:

```ts
readonly id = input.required<string>();      // route param, thanks to withComponentInputBinding()
protected readonly product = httpResource<ApiItemResponse<Product>>(() => `/products/${this.id()}`);
// template: @if (product.isLoading()) … @else if (product.error()) … @else if (product.value(); as res) …
```

httpResource goes through the same interceptors (base-url, token, loading).

## 8. Shared presentational components

`ProductCardComponent` only has `input()`s and `output()`s — no services. Pages decide what "add to cart"
does. That's why one card works on home, products, brand-details, category-details and wishlist.

## 9. UI kit

- Tailwind v4 utilities + DaisyUI components: `btn`, `card`, `input`, `navbar`, `menu`, `dropdown`, `badge`,
  `indicator`, `alert`, `toast`, `loading`, `progress`, `skeleton`, `modal`, `join` (pagination).
- Theme colors in `src/styles.css` (`--color-primary: #16a34a`).
- Icons: Font Awesome (`<i class="fa-solid fa-cart-shopping">`). No `aria-*` attributes or screen-reader text anywhere (owner's choice).
- The initial CSS is ~200 kB raw (~33 kB gzipped) because of Font Awesome + DaisyUI → `ng build` shows a
  budget **warning** (not an error). Fine for now.

## 10. No unit tests

By choice there are no spec files (`skipTests: true` in angular.json). Check your work with `ng build` and by using the app.

## 11. Forgot password: a stepper made of `@if`s

The forgot-password page shows 3 forms, one at a time, with a `step` signal (`1 | 2 | 3`) and `@if (step() === 1)`.
- The 3 circles at the top are buttons: click an earlier one to go back; later ones are disabled.
- The 3 Signal Forms live in the component class, so what you typed is still there when you go back.
- The slide-in effect is a CSS keyframe in `forgot-password.component.css`.
- Tried and dropped: PrimeNG 22 (needs a license key, shows an "Invalid PrimeUI License" badge) and Angular Material's stepper (needs `viewChild` + `completed` to move forward from code).

## 12. Where CSS lives

- `src/styles.css` has only global things: fonts, Tailwind, the DaisyUI theme, the `primary-*` colors, the body style, and animations shared by several pages (`float`: login, forgot-password, 404).
- CSS that belongs to one component sits in that component's `.css` file: the toast time-out bar (`toasts.component.css`), the step slide-in (`forgot-password.component.css`), Swiper's styles and white dots (`hero-slider.component.css`).
- Swiper creates its dots at runtime, so `HeroSliderComponent` uses `ViewEncapsulation.None`; otherwise Angular's scoped styles would not reach them.
- The `anyComponentStyle` budget in `angular.json` is 12 kB / 16 kB because Swiper's own CSS is about 10 kB.
