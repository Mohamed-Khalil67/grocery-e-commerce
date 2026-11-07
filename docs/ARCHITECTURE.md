# Architecture — FreshCart (Angular 22)

Stack: Angular 22 (standalone, signals) · client-side rendering only (SSR removed for now) · Tailwind CSS v4 (+ DaisyUI for a few helpers) · Font Awesome · Exo font.
API: Route e-commerce API `https://ecommerce.routemisr.com/api/v1` · [Postman docs](https://documenter.getpostman.com/view/5709532/2s93JqTRWN) · demo: <https://freshcart-route.vercel.app>.

## Where this structure comes from

Searched the web for how Angular projects are organised. The sources agree on:

| Rule | Source |
|---|---|
| Group **by feature**, not by file type; a feature folder holds its own components, services and routes | [Angular folder structure best practices](https://medium.com/@ajaysingh_25/angular-folder-structure-best-practices-f9ca342a067c), [Feature-based directory structure](https://medium.com/@sehban.alam/feature-based-directory-structure-in-angular-a-step-by-step-guide-to-clean-code-and-scalable-apps-f97f86e9bec9) |
| `core/` = app-wide singletons (interceptors, guards, auth); `shared/` = UI reused by several features | [Angular folder structure for large projects](https://medium.com/@rohitjsingh16/angular-folder-structure-for-large-projects-b694a8878b44) |
| Features import only from `core` and `shared`, not from each other; extract to `shared` when two features need it | [Angular-Project-Architecture (README)](https://github.com/bodnya29179/Angular-Project-Architecture) |
| Feature services belong **inside the feature**, don't dump everything in `core`/`shared` | [High scalable folder structure](https://medium.com/edataconsulting/high-scalable-folder-structure-in-angular-applications-a50b55f94350) |
| Don't nest too deep (long import paths); co-locate files that change together | [Angular project structure best practices](https://www.bairesdev.com/blog/angular-project-structure-best-practices-tips/) |

None of them define how deep child components nest, so this project uses one simple rule (below).

## The rules

1. `features/<feature>/` contains **`pages/`** (routed), **`components/`** (used by that feature's pages), **`services/`**, **`models/`**.
2. A component used **only by one parent** lives **inside that parent's folder**, in its own `components/` folder. Stop at 2 levels.
3. A component used by **two or more features** moves to `shared/`.
4. `core/` never imports from `features/`. Features never import from other features, with two exceptions that are written down:
   - the **navbar** (layout) reads `CartService` and `WishlistService` for its badges;
   - `core/auth` imports the auth **models** from `features/auth/models`.
5. Pages are "smart" (inject services, load data). Components are "dumb" when possible: `input()` / `output()` only.

## Folder structure

```text
src/app/
├── app.ts · app.html           # root: loading bar + <router-outlet>
├── app.config.ts               # router features, HttpClient + interceptors
├── app.routes.ts               # all routes (lazy)
│
├── core/                       # singletons used by everything
│   ├── auth/
│   │   ├── guards/             # auth.guard.ts (→ /login?callbackUrl=…) · guest.guard.ts           ✅
│   │   └── services/           # auth.service.ts: token signal, signIn/Up/Out         ✅
│   ├── interceptors/           # base-url · auth (token header) · loading · error (401)            ✅
│   ├── models/                 # shared API shapes: api-response, product, brand, category         ✅
│   └── utils/api-error.ts      # getApiErrorMessage(err)                                           ✅
│
├── layouts/
│   └── main-layout/            # the ONE layout (as in the demo)                                  ✅
│       ├── navbar/             #   top bar + search + categories dropdown + badges + mobile drawer
│       ├── feature-strip/      #   "Free Shipping / Easy Returns / …" strip
│       └── footer/
│
├── shared/                     # reused by 2+ features, no API calls
│   ├── components/product-card/        # ✅ (home, products, brand/category details, wishlist, related)
│   └── ui/
│       ├── page-header/ section-title/ star-rating/   ✅
│       └── pagination/ quantity-stepper/ empty-state/              TODO
│
└── features/
    ├── auth/
    │   ├── pages/        login ✅ · register ✅ (route /signup) · forgot-password TODO (/forget-password)
    │   ├── components/   social-buttons ✅ · password-strength ✅   (used by login AND register)
    │   ├── services/     password-reset.service.ts  TODO
    │   └── models/       auth.interface.ts
    ├── home/
    │   ├── pages/home
    │   └── components/   hero-slider · category-slider · promo-banners · featured-products · newsletter-section
    ├── shop/
    │   ├── pages/        products · product-details
    │   ├── components/
    │   │   ├── product-gallery/
    │   │   ├── product-info/
    │   │   ├── product-tabs/
    │   │   │   └── components/   product-description · review-list · review-form     ← child of product-tabs
    │   │   └── related-products/
    │   └── services/     product.service.ts · review.service.ts
    ├── categories/       pages(categories, category-details) · components(category-card, subcategory-chips) · services(category.service)
    ├── brands/           pages(brands, brand-details) · components(brand-card) · services(brand.service)
    ├── cart/             pages(cart) · components(cart-item, cart-summary) · services(cart.service) · models
    ├── wishlist/         pages(wishlist) · components(wishlist-item) · services(wishlist.service) · models
    ├── payment/          pages(checkout) · components(shipping-form, payment-method-picker, order-summary)
    │                     services(payment.service, address.service) · models(address)
    ├── orders/           pages(orders) · services(order.service) · models
    │   └── components/order-card/components/order-item-row/                              ← 2 levels deep
    ├── profile/          pages(profile) · components(change-password-form, update-profile-form) · services(profile.service)
    └── not-found/        pages(not-found)  ✅
```

## Feature map — page × components × service × endpoint

| Feature | Route | Guard | Page | Child components | Service | Endpoints |
|---|---|---|---|---|---|---|
| auth | `/login` `/signup` | guest | Login ✅ Register ✅ | social-buttons, password-strength | AuthService (core) | `POST /auth/signin` `POST /auth/signup` |
| auth | `/forget-password` | guest | ForgotPassword | – | PasswordResetService | `POST /auth/forgotPasswords` `POST /auth/verifyResetCode` `PUT /auth/resetPassword` |
| home | `/` | – | Home | hero-slider, category-slider, promo-banners, featured-products, newsletter-section | (uses Product/Category/Cart/Wishlist) | `GET /categories` `GET /products` |
| shop | `/products` | – | Products | – | ProductService | `GET /products` |
| shop | `/products/:id` | – | ProductDetails | gallery, info, tabs(description, reviews), related | ProductService, ReviewService | `GET /products/:id` `GET/POST /products/:id/reviews` |
| brands | `/brands` `/brands/:id` | – | Brands, BrandDetails | brand-card | BrandService | `GET /brands(/:id)` `GET /products?brand=` |
| categories | `/categories` `/categories/:id` | – | Categories, CategoryDetails | category-card, subcategory-chips | CategoryService | `GET /categories(/:id)` `…/:id/subcategories` `GET /products?category[in]=` |
| cart | `/cart` | – (empty state for guests, like the demo) | Cart | cart-item, cart-summary | CartService | `GET/POST/DELETE /cart` `PUT/DELETE /cart/:id` |
| wishlist | `/wishlist` | – | Wishlist | wishlist-item | WishlistService | `GET/POST /wishlist` `DELETE /wishlist/:id` |
| payment | `/checkout/:cartId` | auth | Checkout | shipping-form, payment-method-picker, order-summary | PaymentService, AddressService | `POST /orders/:cartId` `POST /orders/checkout-session/:cartId` `/addresses` |
| orders | `/profile/orders` (`/allorders` redirects) | auth | Orders | order-card → order-item-row | OrderService | `GET /auth/verifyToken` `GET /orders/user/:userId` |
| profile | `/profile` | auth | Profile | change-password-form, update-profile-form | ProfileService | `PUT /users/changeMyPassword` `PUT /users/updateMe` |

## How a request flows

```text
component ─▶ service: http.get<ApiListResponse<Product>>('/products')
              ▼ interceptors (order set in app.config.ts)
   1 baseUrl   '/products' → 'https://ecommerce.routemisr.com/api/v1/products'
   2 auth      adds header  token: <jwt>   (Route API host only)
   3 loading   NgxSpinnerService show() / hide() → full-screen spinner
   4 error     401 while logged in → signOut(); always re-throws
              ▼
           Route API ─▶ typed response
```

## State

- Services own state as plain signals (`readonly x = signal(...)`). Only the service calls `.set()`/`.update()`; components just read. (`.asReadonly()` is an optional hardening step for later.)
- The app is client-rendered only, so `localStorage` can be used directly (the token lives there).

## Verified against the live API / demo (what differs from the Postman collection)

- List responses: `{ results, metadata: { currentPage, numberOfPages, limit, nextPage?, prevPage? }, data }`; single: `{ data }`.
- Product page size in the demo is **40** (56 products → 2 pages). `limit`, `page`, `sort=-price`, `brand=`, `category[in]=`, `price[gte]=` work.
- `GET /products/:id` also embeds `reviews`; `GET /products/:id/reviews` is paginated.
- Errors: `{ statusMsg:'fail', message }` or validation `{ message:'fail', errors:{ msg, param } }`. Bad id → **400**, no/invalid token → **401**.
- Demo quirks you should NOT copy: its navbar category links use wrong ids and its footer "Register" link 404s (real route is `/signup`).
- Demo pages behind login (filled cart/wishlist, checkout, orders, profile) were not inspected; the TODOs say so.
