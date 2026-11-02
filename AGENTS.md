# AGENTS.md

Guidance for AI coding agents working on this Angular 22 e-commerce app (SSR/SSG, Tailwind CSS v4, DaisyUI, Vitest).

## Tooling

- Use the `angular-cli` MCP server (configured in `.mcp.json`): call `list_projects` first, then `get_best_practices` before writing code. Use `search_documentation` for API questions.
- Use the skills in `.agents/skills/` (`angular-developer`, `angular-new-app`) for components, services, forms, routing, SSR and testing.
- Generate code with `ng generate` so naming and file layout stay consistent.
- Before finishing a task run `ng build` and `ng test --no-watch`; both must pass with zero type errors.

## Type safety (mandatory)

### Compiler
- `strict: true` and `strictTemplates: true` stay enabled. Never loosen them or add `// @ts-ignore` / `// @ts-nocheck`.
- `// @ts-expect-error` is allowed only with a comment explaining why, and only in tests.

### Types
- No `any`. Use `unknown` and narrow with type guards, `instanceof`, or a schema check.
- No non-null assertions (`!`) and no `as` casts to silence errors. Narrow instead. `as const` and `satisfies` are fine.
- Annotate every public method's parameters and return type, and every exported function. Rely on inference only for local variables.
- Model domain data with `interface`/`type` in `src/app/**/models` (e.g. `Product`, `CartItem`, `Order`). Mark fields `readonly` unless mutated.
- Use string-literal unions instead of `enum` (e.g. `type OrderStatus = 'pending' | 'paid' | 'shipped'`); make `switch` statements exhaustive with a `never` check.
- Use discriminated unions for states (`{ status: 'loading' } | { status: 'error'; error: string } | { status: 'ready'; data: T }`).
- Use `Record<K, V>` / `Partial<T>` / `Pick<T, K>` rather than index signatures; access index-signature props with brackets.
- Optional values: prefer `T | undefined` with explicit checks; do not use `null` and `undefined` interchangeably.

### Angular
- Signals typed explicitly when not inferable: `signal<Product[]>([])`, `input.required<Product>()`, `output<string>()`, `model<number>()`.
- `HttpClient` calls always specify the response type: `http.get<Product[]>(url)`. Never leave it as `Object`/`any`.
- Typed forms only (`FormControl<string>`, `nonNullable`) or Signal Forms; never `UntypedFormGroup`/`UntypedFormControl`.
- Typed routes: `Routes` / `ResolveFn<T>` / `CanActivateFn`; read params through `input()` binding with a typed signature.
- Use `inject()` with typed tokens; create `InjectionToken<T>` for config values. Environment values come from the typed `environment` files.
- Template references and `@for` loops must use `track` with a stable id.

### External data
- API responses are untrusted. Define a DTO type, map it to the domain model in the service layer, and validate/narrow unexpected shapes before use.
- Never cast `JSON.parse` results; assign to `unknown` and narrow.
- Guard browser-only APIs (`window`, `localStorage`) for SSR with `isPlatformBrowser` or `afterNextRender`.

## Style

- Follow `.editorconfig` and `.prettierrc`. CSS only (no SCSS).
- Standalone components, native control flow (`@if/@for/@switch`), `input()/output()` functions, `host` object instead of `@HostBinding/@HostListener`.
- Accessible by default: WCAG AA, AXE-clean, semantic HTML, labelled controls.

## Git

- Conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`).
- Do not commit `dist/`, `.angular/`, or `node_modules/`.
