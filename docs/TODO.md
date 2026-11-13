# TODO roadmap — build it yourself

The base is done (✅). Everything else is yours. Each TODO is written in the code next to where it goes;
search the project for `TODO(<tag>)`.

**How each TODO is written** (Angular AI-tutor style): an **objective**, what the finished thing **does**,
the **endpoints**, and the **concepts** to practice — never the steps. Work it out, then:

- stuck → ask Claude **"hint for TODO(cart)"** → you get a hint or a guiding question, not the answer
- finished → ask **"review TODO(cart)"** → Claude checks your code, runs `ng build`
- really stuck → **"show me the solution for TODO(cart)"**

## ✅ Already built (read it, it's the reference)

- [x] Feature folders (pages / components / services / models), lazy routes, ONE layout, navbar + footer + feature strip, 404 (all matched to the demo)
- [x] Interceptors, guards (authGuard keeps `callbackUrl`), AuthService (token signal in localStorage)
- [x] Login + Register (Signal Forms) with child components social-buttons and password-strength
- [x] Shared: product-card, page-header, section-title, star-rating, toasts, loading spinner
- [x] Models for products / categories / brands / auth / list+item responses (verified against the live API)

## Order to build (each step uses what the previous one taught)

### Phase 1 — Read data (GET, httpResource, route params)
1. [ ] `TODO(products-1)` ProductService.getProducts → `TODO(products)` products page with pagination
2. [ ] `TODO(product-details-1)` + `TODO(product-details)` — route param as `input()`, httpResource, gallery
3. [ ] `TODO(categories-1)` + `TODO(categories)` + `TODO(category-details)`
4. [ ] `TODO(brands-1)` + `TODO(brands)` + `TODO(brand-details-1)` + `TODO(brand-details)`
5. [ ] `TODO(home)` — combine everything: slider, categories, featured products, `@defer`

### Phase 2 — Shared state (signals in services, tap, navbar badges)
6. [ ] `TODO(cart-models)` → `TODO(cart-1..4)` in CartService → `TODO(cart)` page
7. [ ] `TODO(wishlist-models)` → `TODO(wishlist-1..3)` → `TODO(wishlist)` page + hearts on cards
8. [ ] Wire "Add to cart" / heart buttons on every page that uses `<app-product-card>`

### Phase 3 — Auth extras + profile (more Signal Forms)
9. [ ] `TODO(auth-models)` + `TODO(auth-forgot-1)` → `TODO(auth-forgot)` page (3-step form, route /forget-password)
10. [ ] `TODO(profile-1)` + `TODO(profile-2)` → `TODO(profile)` page (+ child components)

### Phase 4 — Money
11. [ ] `TODO(order-models)` → `TODO(payment-1)` cash order → `TODO(payment-2)` Stripe → `TODO(payment)` checkout page
12. [ ] `TODO(auth-verify)` + `TODO(orders-1)` → `TODO(orders)` page (`/profile/orders`)

### Phase 5 — Bonus (the task says: use as many endpoints as you can)
13. [ ] Product reviews: list + add (`/products/:id/reviews`), edit/delete own review (`/reviews/:id`)
14. [ ] Saved addresses: `TODO(address-models)` + `TODO(address-1)`, pick one at checkout
15. [ ] Cart v2 + coupon (`PUT /api/v2/cart/applyCoupon`)
16. [ ] Products: sort + filter by brand/category (`TODO(products-2)`)
17. [ ] Route transitions (`withViewTransitions()`) — ⚠ it hung guard redirects during setup; if you add it
      back, test opening `/cart` while logged out
18. [ ] Return to the page you came from after login (guard adds `?returnUrl=`, login reads it)

## Endpoint checklist (tick when used)

| | Endpoint | | Endpoint |
|---|---|---|---|
| [x] | POST /auth/signup | [ ] | GET /wishlist |
| [x] | POST /auth/signin | [ ] | POST /wishlist |
| [ ] | POST /auth/forgotPasswords | [ ] | DELETE /wishlist/:id |
| [ ] | POST /auth/verifyResetCode | [ ] | GET /addresses |
| [ ] | PUT /auth/resetPassword | [ ] | POST /addresses |
| [ ] | PUT /users/changeMyPassword | [ ] | GET /addresses/:id |
| [ ] | PUT /users/updateMe | [ ] | DELETE /addresses/:id |
| [ ] | GET /auth/verifyToken | [ ] | GET /cart |
| [ ] | GET /categories | [ ] | POST /cart |
| [ ] | GET /categories/:id | [ ] | PUT /cart/:id |
| [ ] | GET /categories/:id/subcategories | [ ] | DELETE /cart/:id |
| [ ] | GET /subcategories(/:id) | [ ] | DELETE /cart |
| [ ] | GET /brands | [ ] | PUT /v2/cart/applyCoupon |
| [ ] | GET /brands/:id | [ ] | POST /orders/:cartId (cash) |
| [ ] | GET /products | [ ] | POST /orders/checkout-session/:cartId |
| [ ] | GET /products/:id | [ ] | GET /orders/user/:userId |
| [ ] | GET/POST /products/:id/reviews | [ ] | PUT/DELETE /reviews/:id |

## Definition of done for every TODO

- `ng build` passes with no errors
- no `any`, no `!`, no `as` casts — typed `http.get<T>()` everywhere
- loading, error and empty states exist
- works on a phone-width screen; icon buttons have `aria-label`
