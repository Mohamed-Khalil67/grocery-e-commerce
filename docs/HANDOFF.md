# FreshCart (e-commerce) — handoff for the next session

Give this file to the next session first. It says what is built, what is left, how we work, and everything we
learned about the API (including the things the API docs do not tell you).

Project: `C:\Workspace\Angular\projects\e-commerce` · Angular 22 · SSR · Tailwind v4 + DaisyUI · Font Awesome.
Demo to match: <https://freshcart-route.vercel.app> · API: `https://ecommerce.routemisr.com/api/v1`
· Public Postman docs: <https://documenter.getpostman.com/view/5709532/2s93JqTRWN>
Last commit when this was written: `3e66204 products and paginations` (working tree clean).

---

## 1. How we work (the owner is LEARNING)

- Read `AGENTS.md` first. The owner writes the **logic** (TypeScript); Claude writes the **UI** (templates, styles)
  and explains. The pattern that works: Claude writes the template against agreed names and tests it with
  temporary logic, then restores the owner's file; the owner writes the logic; Claude reviews.
- Do **not** implement a `TODO(tag)` unless asked. "hint for TODO(x)" = one hint + a generic example.
- Keep code **simple**: the common case only. Add edge-case handling only when something really breaks.
- **No** screen-reader support: no `aria-*`, no `role=`, no `sr-only`. (`alt`, `<label for>` and `title` are kept.)
- **No** spec/unit tests. Check with `ng build` and in the browser.
- Component-specific CSS goes in the component's own `.css`; `src/styles.css` is global only.
- Prefer small plain things over libraries. (PrimeNG 22 shows an "Invalid PrimeUI License" badge; Angular
  Material was tried and dropped; the forgot-password stepper is plain `@if`s.)
- Types: no `any`, no `!`, no `as` casts; typed `http.get<T>()`; `@for` needs `track`.
- Check things for real (curl the API, run `ng serve`, look in the browser) instead of guessing.
- The browser pane may hold the owner's real login. Never clear its storage.

## 2. What is built (works, checked)

**App base:** one `MainLayout` = `header-layout` (navbar) + page + `footer-layout` (feature strip + footer); lazy routes;
`authGuard` (→ `/login`) on checkout/profile/orders, `guestGuard` on login/signup/forget-password; 404 page.
**Interceptors** (order: base-url, auth, loading, error): base-url adds the API address to short paths; auth adds
the raw `token` header when logged in; loading shows the ngx-spinner overlay with a request counter; error shows
the API message as a toast and re-throws.
**Auth:** Login (with "Keep me signed in": checked = localStorage, unchecked = sessionStorage), Register, Forgot
password (3 steps in one component with a `step` signal, slide-in animation), logout (800 ms spinner, then clears
both storages). `core/utils/token.ts` has `decodeToken(token)` → `{ id, name, role, iat, exp }`.
**SSR:** `@angular/ssr`; `app.routes.server.ts` renders cart, wishlist, checkout, profile, profile/orders and
allorders in the browser (`Client`) and everything else on the server. `AuthService` only reads storage when
`isPlatformBrowser`.
**Home (4 of 6 sections):** hero slider (Swiper, demo photo in `public/images/hero/home-slider.png`), "Shop By
Category" grid (own `rxResource`-free `httpResource` + skeleton), promo banners.
**Categories page:** header + 5-column grid of `<app-category-card>`, `rxResource` through `CategoryService`.
**Products page:** `page` and `keyword` inputs (with `transform`s because the router sets missing params to
`undefined`), ONE `rxResource` through `ProductService.getProducts(page)`, `filteredProducts` = `computed()` that
filters by title in the browser (the API has no search), grid of `<app-product-card>`, `<app-pagination>`.
**Pagination component:** links (`[routerLink]="[]"` + `queryParamsHandling="merge"`), window of the current page
±2 with "1 ..." and "... last" (`firstShown`, `lastShown`, `pages`); tested with 20 fake pages.
**Shared UI:** page-header (breadcrumb), section-title, star-rating, toasts (progress bar + X), product-card.
**Services written** (all return Observables; none of them has state yet except `AuthService`):
Product, Category, Brand, Review, Address, Order, Payment, Profile, PasswordReset. `CartService` and
`WishlistService` are still stubs with a `count` / `ids` signal.

## 3. What is left (in a sensible order)

| # | Item | Tags / files | Notes |
|---|---|---|---|
| 1 | **Category details** page | `TODO(category-details)`, `subcategory-chips` | route `/categories/:id`; header uses the category image; list of subcategories **filtered by `category === id`** (API quirk, section 5); then products of that category: `category[in]` param (service has only `page` today: add a param) |
| 2 | **Brands** page + **Brand details** | `TODO(brands)`, `brand-card`, `TODO(brand-details)` | 54 brands, 40 per page, reuse `<app-pagination>`. The demo redirected `/brands` to `/login` (not inspected). Brand details = products of one brand: `brand` param (add to the service) |
| 3 | **Product details** | `TODO(product-details)`, gallery, info, tabs (+ description, review-list, review-form), related-products | `:id` as `input.required<string>()` + `rxResource`; `GET /products/:id` already includes reviews |
| 4 | **Home: featured products + newsletter** | `TODO(home-featured)`, `TODO(home-newsletter)` | uses `ProductService.getProducts()` (first 10); the owner still has to decide the "featured" rule (API has no such flag; default order is fine) |
| 5 | **Cart** | `TODO(cart-models)`, `cart-1..4`, cart page, cart-item, cart-summary, quantity-stepper | first service WITH state: `count` + `cartId` signals, `tap()` on every reply, load once at start/login (`MainLayout` has the TODO), `reset()` from `AuthService.signOut()` |
| 6 | **Wishlist** | `TODO(wishlist-models)`, `wishlist-1,3`, wishlist page, wishlist-item | `ids` signal for the hearts on `<app-product-card>`; POST/DELETE return only ids |
| 7 | Wire "Add to cart" / heart on every `<app-product-card>` | product-card outputs `addToCart`, `toggleWishlist` | emits the product id; pages decide what to do |
| 8 | **Profile** (change password, update profile) | `TODO(profile)`, `profile-1,2`, 2 forms | `changePassword` returns a NEW token → `saveSession` |
| 9 | **Checkout** (cash + Stripe) | `TODO(payment)`, shipping-form, payment-method-picker, order-summary | needs `cartId`; Stripe: send the browser to `session.url`, return URL param = your origin |
| 10 | **Orders** | `TODO(orders)`, `orders-1`, order-card, order-item-row | user id = `decodeToken(token).id` (or `GET /auth/verifyToken`); `/allorders` redirects to `/profile/orders` |
| 11 | Bonus endpoints | see section 6 | reviews add/edit/delete, addresses, coupon (v2 cart), products sort/filter |

### Loose ends
- Delete the `console.log` checks when each part is done: loading interceptor, forgot-password, category-slider,
  hero-slider.
- Delete unused imports in `categories.component.ts` (`OnInit`, `signal`, `Product`, `Category`); fix the stale comment
  and ordering in `pagination.component.ts` (comment on the loop; `pages` is declared before `firstShown`/`lastShown`).
- The finished pages (categories, products, pagination) still carry their old `🎯 TODO(...)` header comments.
- Navbar "Categories" dropdown uses 4 hard-coded ids: load it from `CategoryService` (`TODO(navbar-1)`).
- The demo shows the feature strip right under the hero on the home page; ours is in the footer layout on every page.
- Expired token (401) is not handled: when met, sign out inside `error.interceptor.ts` (comment is there).
- Social buttons (Google / Facebook) are drawn but do nothing.
- Real login / forgot-password / cart / orders were tested only with faked replies. Test against the API.
- Deploy: the first Vercel deploy failed because files were not committed. Re-check after pushing; add the real domain
  to `security.allowedHosts` in `angular.json` (it is `[]`; the local production server answers 400 on localhost).
- Remaining unfinished places listed in `docs/TODO.md` (roadmap + endpoint checklist) and `docs/SSR.md` (SSR notes).

## 4. Code map (where things are)

```text
src/app/
  core/            auth (guards, AuthService), interceptors, models (api-response, product, brand, category),
                   services (toast), utils (api-error.ts, token.ts)
  layouts/         main-layout, header-layout/navbar, footer-layout/{footer, feature-strip}
  shared/          components/product-card, ui/{page-header, section-title, star-rating, toasts, pagination,
                   empty-state (stub), quantity-stepper (stub)}
  features/<f>/    pages, components (children nested inside their parent), services, models
```

Patterns to reuse: page data = `rxResource({ params: () => this.someInput(), stream: ({ params }) => service.method(params) })`
(or no `params` for a request with no inputs); template switch = `@if (res.error()) … @else if (res.value(); as r) …`;
URL as state = `input()` bound by `withComponentInputBinding()` + links with `queryParamsHandling="merge"`; loading UI
= the global ngx-spinner (no per-page skeletons except the home category grid).

## 5. API quirks (verified with real calls unless marked)

1. **Response shapes.** List: `{ results, metadata: { currentPage, numberOfPages, limit, nextPage?, prevPage? }, data: [] }`
   (`results` is the TOTAL count, not the length of `data`). One item: `{ data: {...} }`. Default page size: **40**.
2. **`keyword` does not search.** Documented, but `?keyword=anything` returns 0 results (products). Search is done in
   the browser. An EMPTY `keyword=` also returns 0, so never send it. Products accept `title=` only as an exact match.
3. **`priceAfterDiscount: 0` means "no discount"** (9 of 16 products on page 2). Treat 0 like missing.
4. **Subcategories:** `GET /categories/:id/subcategories` can return subcategories of OTHER categories (60 mixed,
   2 pages; with `?limit=100` it returned only the 10 of that category, `?limit=60` returned 50). Each subcategory has
   `category` = the parent's id as a **string**, so filter `s.category === id`. `GET /subcategories/:id` also has the
   string id; a product's `subcategory[]` items too.
5. **Counts:** 56 products (2 pages), 10 categories, 54 brands (2 pages), 60 subcategories, ~505 reviews overall,
   54 reviews on the Woman Shawl product (2 pages).
6. **Router inputs:** a missing query param arrives as `undefined` (and `numberAttribute(undefined)` is `NaN`), it does
   not keep the input's default. Give inputs a `transform`.
7. **Errors:** `{ statusMsg: 'fail', message }` (e.g. wrong login: 401 "Incorrect email or password"; unknown email on
   forgot: 404; invalid reset code: 400 "Reset code is invalid or has expired"; bad id: 400) and validation errors
   `{ message: 'fail', errors: { msg, param, ... } }`. `core/utils/api-error.ts` turns both into text.
8. **Auth header is a raw `token: <jwt>`** (NOT `Authorization: Bearer`). Protected endpoints without it: 401 (some 400/404).
9. **JWT payload** (from the Postman examples): `{ id, name, role, iat, exp }`; `exp` is about 90 days after `iat`.
10. **Not verified (needs a login):** the reply shapes of cart, wishlist, addresses, orders, payment, profile, add-review.
    Notes from the Route docs: cart replies `{ status, numOfCartItems, cartId, data: { _id, cartOwner, totalCartPrice,
    products: [{ _id, count, price, product }] } }` and **POST /cart returns `product` as an id string while GET /cart returns
    the full object**; wishlist POST/DELETE return only the ids; `GET /orders/user/:id` is a plain array (not wrapped).
    When you test, open DevTools > Network and compare with the types in `models/` (they say "not verified").
11. Sample ids: Electronics category `6439d2d167d9aa4ca970649f` (Men's Fashion `6439d5b90049ad0b52b90048`, Women's
    `6439d58a0049ad0b52b9003f`, Beauty `6439d30b67d9aa4ca97064b1`), product "Woman Shawl" `6428ebc6dc1175abc65ca0b9`,
    product `6428de2adc1175abc65ca05b`, brand Reebok `64089ceb24b25627a2531596`.
12. Images load from `https://ecommerce.routemisr.com/Route-Academy-…` (categories, brands, products).

## 6. API reference (all endpoints from the Postman docs)

Base: `https://ecommerce.routemisr.com/api/v1` (cart/orders v2 under `/api/v2`). In code the paths are short
(`'/products'`), the base-url interceptor adds the rest. "Svc" = the Angular service method that already exists.

### Public (no token) — verified
| Method | Path | Params / body | Reply | Svc |
|---|---|---|---|---|
| GET | `/products` | `page`, `limit`, `sort` (`price`, `-price`, `sold`, `-sold`, `-ratingsAverage`), `brand`, `category[in]` (repeatable), `price[gte]`, `price[lte]`, `fields`, `keyword` (useless) | list of Product | `ProductService.getProducts(page)` (page only) |
| GET | `/products/:id` | | `{ data: Product }` (includes reviews) | `getProduct(id)` |
| GET | `/categories` | `limit`, `page`, `keyword` | list of Category | `CategoryService.getCategories()` |
| GET | `/categories/:id` | | `{ data: Category }` | `getCategory(id)` |
| GET | `/categories/:id/subcategories` | `limit` | list of Subcategory (see quirk 4) | `getSubcategories(id)` |
| GET | `/subcategories`, `/subcategories/:id` | `limit` | list / item | not written |
| GET | `/brands` | `limit`, `page`, `keyword` | list of Brand | `BrandService.getBrands(page)` |
| GET | `/brands/:id` | | `{ data: Brand }` | `getBrand(id)` |
| GET | `/products/:id/reviews` | `page` | list of Review | `ReviewService.getReviews(id, page)` |
| GET | `/reviews`, `/reviews/:id` | | list / item | not written |
| GET | `/users` | `limit`, `keyword` | list of users | not written |

Product: `_id, id, title, slug, description, quantity, price, priceAfterDiscount?, imageCover, images[], category{_id,name,slug,image},
brand{_id,name,slug,image}, subcategory[], ratingsAverage, ratingsQuantity, sold`. Category/Brand: `_id, name, slug, image`.
Subcategory: `_id, name, slug, category (string id)`. Review: `_id, review, rating (1-5), product (id), user{_id,name}, createdAt, updatedAt`.

### Auth
| Method | Path | Body | Reply | Svc |
|---|---|---|---|---|
| POST | `/auth/signup` | `{ name, email, password, rePassword, phone }` | `{ message, user, token }` | `AuthService.signUp` ✅ used |
| POST | `/auth/signin` | `{ email, password }` | `{ message, user:{name,email,role}, token }` | `AuthService.signIn` ✅ used |
| POST | `/auth/forgotPasswords` | `{ email }` | message (emails a 6-digit code) | `PasswordResetService.forgotPassword` ✅ used |
| POST | `/auth/verifyResetCode` | `{ resetCode }` | `{ status }` | `verifyResetCode` ✅ used |
| PUT | `/auth/resetPassword` | `{ email, newPassword }` | `{ token }` | `resetPassword` ✅ used |
| PUT | `/users/changeMyPassword` | `{ currentPassword, password, rePassword }` | `{ message, token }` (NEW token) | `ProfileService.changePassword` |
| PUT | `/users/updateMe` | `{ name, email, phone }` | `{ message, ... }` | `ProfileService.updateMe` |
| GET | `/auth/verifyToken` | (token) | `{ message, decoded: { id, name, role, iat, exp } }` | not written (`TODO(auth-verify)`) |

### Needs the login token
| Method | Path | Body | Svc |
|---|---|---|---|
| GET | `/wishlist` | | `WishlistService` (stub) |
| POST | `/wishlist` | `{ productId }` | stub |
| DELETE | `/wishlist/:productId` | | stub |
| GET / POST | `/addresses` | POST `{ name, details, phone, city }` | `AddressService.getAddresses / addAddress` |
| GET / DELETE | `/addresses/:id` | | `AddressService.removeAddress` (get-one not written) |
| GET | `/cart` | | `CartService` (stub) |
| POST | `/cart` | `{ productId }` | stub |
| PUT | `/cart/:productId` | `{ count }` (the docs send it as a string) | stub |
| DELETE | `/cart/:productId` and `/cart` | | stub |
| v2: GET, POST, DELETE `/api/v2/cart`; PUT, DELETE `/api/v2/cart/:productId`; PUT `/api/v2/cart/applyCoupon` | `{ couponName }` | bonus |
| POST | `/orders/:cartId` | `{ shippingAddress: { details, phone, city, postalCode? } }` (cash) | `PaymentService.createCashOrder` |
| POST | `/orders/checkout-session/:cartId?url=<your origin>` | `{ shippingAddress }` → `{ session: { url } }` | `PaymentService.createCheckoutSession(cartId, address, returnUrl)` |
| v2: POST `/api/v2/orders/:cartId` | `{ shippingAddress }` | bonus |
| GET | `/orders/user/:userId` | | `OrderService.getUserOrders(userId)` |
| GET | `/orders/` | all orders | not written |
| POST | `/products/:id/reviews` | `{ review, rating }` | `ReviewService.addReview` |
| PUT / DELETE | `/reviews/:id` | PUT `{ review, rating }` (owner only) | not written |

## 7. Useful commands and test recipes

- Dev server: `ng serve` (default port 4200; I used `--port 4300`). Production server needs `allowedHosts`.
- `ng build` must pass. The initial bundle is about 584 kB (warning limit 700 kB); component CSS budget is 12/16 kB
  (Swiper's own CSS is about 10 kB).
- See the dots of the pagination with real data (only 2 pages): temporarily put
  `[currentPage]="page()" [numberOfPages]="20"` on `<app-pagination>` in `products.component.html`, then restore it.
- Server-rendered pages print their `console.log` in the `ng serve` terminal as well as in the browser console. A full
  page load makes the API call on the server (the browser reuses the answer); a click on a link makes it in the browser.
