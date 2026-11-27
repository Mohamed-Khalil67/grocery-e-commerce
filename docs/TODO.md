# TODO roadmap — build it yourself

> For a new session read `docs/HANDOFF.md` first: it has the current status, the working rules and ALL the API data.

The base is done (✅). Everything else is yours. Each TODO is written in the code next to where it goes;
search the project for `TODO(<tag>)`.

**How each TODO is written** (Angular AI-tutor style): an **objective**, what the finished thing **does**,
the **endpoints**, and the **concepts** to practice — never the steps. Work it out, then:

- stuck → ask Claude **"hint for TODO(cart)"** → you get a hint or a guiding question, not the answer
- finished → ask **"review TODO(cart)"** → Claude checks your code, runs `ng build`
- really stuck → **"show me the solution for TODO(cart)"**

## ✅ Already built (read it, it's the reference)

- [x] Feature folders (pages / components / services / models), lazy routes, ONE layout (`header-layout` + `footer-layout`), navbar + footer + feature strip, 404
- [x] Interceptors (base URL, token, spinner with request counter, error toast), guards (`authGuard` → /login, `guestGuard`)
- [x] SSR (`@angular/ssr`): user pages (cart, wishlist, checkout, profile, orders) render in the browser, the rest on the server
- [x] **Auth:** Login (with "Keep me signed in"), Register, Forgot password (3-step form), logout with a short spinner
- [x] **Home, 4 of 6 sections:** hero slider (Swiper), "Shop By Category" grid, promo banners, plus the products request already in `HomeComponent`
- [x] Shared: product-card, page-header, section-title, star-rating, toasts, ngx-spinner
- [x] Models for products / categories / brands / auth / list+item responses (verified against the live API)

## The assignment (what the course asks for)

Build every page below, **even the ones the demo does not have**, and use as many API endpoints as you can.

- Demo: https://freshcart-route.vercel.app/products
- API docs: https://documenter.getpostman.com/view/5709532/2s93JqTRWN

1. **Authentication:** Login, Register, Forgot password, Change password
2. **Homepage** with all its sections
3. **Listing + details pages:** Products, Product details, Brands, Brand details, Categories, Category details
4. **Cart:** display, add, remove, update quantity
5. **Wishlist:** display, add, remove
6. **Payment:** online (Stripe) and cash
7. **Orders** page

## Your task spec: what is left (the quests)

Tick each when it works in the browser AND `ng build` passes. _Status updated 2026-11-23._

| Quest | Status | Where / next step |
|---|---|---|
| Auth: Login, Register, Forgot password | ✅ done | |
| Auth: **Change password** | 🟡 written, needs a test with a real login | `change-password-form` saves the NEW token with `AuthService.updateSession({ token })`. Check a wrong current password shows the API message |
| **Homepage** | ✅ done (6 of 6 sections) | |
| **Products** page | ✅ done (grid, pagination, search) | bonus: `TODO(products-2)` sort + filter |
| **Product details** | 🟡 gallery + info done | `TODO(product-info)`, `TODO(product-tabs)` (+ description, `review-list`, `review-form`), `TODO(related-products)` |
| **Brands** + Brand details | ✅ done | delete the old `🎯 TODO` headers in both files |
| **Categories** + Category details | ✅ done (+ subcategory chips) | delete the old `🎯 TODO` header in `categories.component.ts` |
| **Cart:** display, add, remove, update quantity | 🟡 CartService done, badge works | `TODO(quantity-stepper)`, `TODO(empty-state)` → `TODO(cart-item)`, `TODO(cart-summary)` → `TODO(cart)`; then `TODO(cart-clear)`, `TODO(cart-id)` |
| **Wishlist:** display, add, remove | 🟡 written, needs a test with a real login | models, `WishlistService`, row, page and hearts on the 4 product pages are done. Both `CartService` and `WishlistService` now own an `rxResource` that follows the login token (no effect in `main-layout`, no `reset()`), with `count` / `ids` as `computed`; every change reloads the resource. Still to test with a real login |
| **Profile:** update name / email / phone | 🟡 written, needs a test with a real login | `update-profile-form` + `TODO(profile)` page (sidebar + 2 forms, all three fields required). Check what the API does when the email is unchanged |
| **Payment:** cash + online (Stripe) | ⬜ | `TODO(order-models)` → `TODO(shipping-form)`, `TODO(payment-method-picker)`, `TODO(order-summary)` → `TODO(payment)` checkout page |
| **Orders** page | ⬜ | `TODO(auth-verify)` (gives the user id) → `TODO(order-item-row)`, `TODO(order-card)` → `TODO(orders)` |
| "Use as many API endpoints as you can" | 🟡 | see the endpoint checklist below + Phase 5 bonuses |

## Order to build (each step uses what the previous one taught)

### Phase 0 — Navbar
- [x] Support "24/7 Help" link: was `/contact` (no such route → 404), now calls the phone number
- [x] "My Orders" link for signed-in users (top bar + mobile drawer)
- [x] Mobile drawer links highlight the active page
- [x] `TODO(navbar-1)`: load the Categories dropdown from `CategoryService` instead of the 4 hard-coded ids

### Phase 1 — Read data (GET, httpResource, route params) ✅
1. [x] Products page with pagination + search
2. [x] Product details: route param as `input()`, httpResource, gallery
3. [x] Categories + Category details (+ subcategory chips)
4. [x] Brands + Brand details
5. [x] Home: featured products + newsletter

### Phase 2 — Shared state (signals in services, tap, navbar badges)
6. [x] CartService (count signal + `tap`), cart loaded on login, reset on logout
7. [x] Shared UI: `TODO(quantity-stepper)` ✅ · `TODO(empty-state)` ✅
8. [x] `TODO(cart-item)` + `TODO(cart-summary)` → `TODO(cart)` page (matches https://ecommerce-route-ashen.vercel.app/cart); `clearCart()` + cart id done. Still to test with a real login.
9. [ ] `TODO(wishlist-models)` → `TODO(wishlist-1)` (+ load it in `main-layout`) → `TODO(wishlist-item)` → `TODO(wishlist)` page
10. [ ] Wire "Add to cart" / heart buttons on every page that uses `<app-product-card>`
11. [ ] `TODO(wishlist-3)`: reset the wishlist on sign-out (`AuthService.signOut()`)

### Phase 3 — Profile (more Signal Forms)
12. [x] ProfileService: `changePassword()`, `updateMe()`
13. [x] `TODO(change-password-form)` + `TODO(update-profile-form)` → `TODO(profile)` page (to test with a real login)

### Phase 4 — Money
14. [ ] `TODO(order-models)` → payment service (cash order + Stripe session) → `TODO(shipping-form)`, `TODO(payment-method-picker)`, `TODO(order-summary)` → `TODO(payment)` checkout page
15. [ ] `TODO(auth-verify)` + order service → `TODO(order-item-row)`, `TODO(order-card)` → `TODO(orders)` page (`/profile/orders`)

### Phase 5 — Bonus (the task says: use as many endpoints as you can)
16. [ ] Product reviews: list + add (`/products/:id/reviews`), edit/delete own review (`/reviews/:id`)
17. [ ] Saved addresses: `TODO(address-models)` + `TODO(address-1)`, pick one at checkout
18. [ ] Cart v2 + coupon (`PUT /api/v2/cart/applyCoupon`; the promo codes on the home banners are only text for now)
19. [ ] Products: sort + filter by brand/category/price (`TODO(products-2)`; add `price[gte]`, `price[lte]` and `fields` to `ProductQuery`)
20. [ ] Route transitions (`withViewTransitions()`) — ⚠ it hung guard redirects during setup; if you add it
      back, test opening `/cart` while logged out

## Loose ends (small things noticed along the way)

- [ ] **Remove the `console.log` checks** when a part is finished (home, category slider, hero slider, forgot password, spinner interceptor)
- [ ] **Feature strip position:** the demo shows it right under the hero on the home page; ours is in the footer layout on every page
- [ ] **Expired token (401):** nothing signs the user out yet. When you meet it, add the sign-out in `error.interceptor.ts` (the file has a comment)
- [ ] **Social buttons** (Google / Facebook) are drawn but do nothing — remove them or leave them like the demo
- [ ] **Test a real login and a real forgot-password** against the API (everything so far was tested with faked replies)
- [ ] **Deploy:** commit everything, push, check Vercel; add your real domain to `security.allowedHosts` in `angular.json`
- [ ] **Delete stale `🎯 TODO` headers** in pages that are finished (brands, brand-details, categories, products, product-details, home, pagination)

## Endpoint checklist (tick when used)

| | Endpoint | | Endpoint |
|---|---|---|---|
| [x] | POST /auth/signup | [ ] | GET /wishlist |
| [x] | POST /auth/signin | [ ] | POST /wishlist |
| [x] | POST /auth/forgotPasswords | [ ] | DELETE /wishlist/:id |
| [x] | POST /auth/verifyResetCode | [ ] | GET /addresses |
| [x] | PUT /auth/resetPassword | [ ] | POST /addresses |
| [ ] | PUT /users/changeMyPassword | [ ] | GET /addresses/:id |
| [ ] | PUT /users/updateMe | [ ] | DELETE /addresses/:id |
| [ ] | GET /auth/verifyToken | [x] | GET /cart |
| [x] | GET /categories | [ ] | POST /cart |
| [x] | GET /categories/:id | [ ] | PUT /cart/:id |
| [x] | GET /categories/:id/subcategories | [ ] | DELETE /cart/:id |
| [ ] | GET /subcategories(/:id) | [ ] | DELETE /cart |
| [x] | GET /brands | [ ] | PUT /v2/cart/applyCoupon |
| [x] | GET /brands/:id | [ ] | POST /orders/:cartId (cash) |
| [x] | GET /products | [ ] | POST /orders/checkout-session/:cartId |
| [x] | GET /products/:id | [ ] | GET /orders/user/:userId |
| [ ] | GET/POST /products/:id/reviews | [ ] | PUT/DELETE /reviews/:id |

### More endpoints from your Postman collection (not in the table above)

| | Endpoint | Where it could be used |
|---|---|---|
| [ ] | GET /reviews | a "latest reviews" list (bonus) |
| [ ] | GET /reviews/:id | edit-review form (bonus) |
| [ ] | GET /orders | all orders (admin-style, bonus) |
| [ ] | GET /users | all users (bonus; the API answers with a list) |
| [ ] | v2 cart + v2 orders (`/api/v2/cart…`, `/api/v2/orders/:cartId`) | the cart/checkout bonus, together with the coupon |

The task says to use as many endpoints as you can: after the main quests, go through this table and the one above and tick what you have not used.

## Definition of done for every TODO

- `ng build` passes with no errors
- no `any`, no `!`, no `as` casts — typed `http.get<T>()` everywhere
- loading, error and empty states exist
- works on a phone-width screen
