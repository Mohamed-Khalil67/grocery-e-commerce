# TODO roadmap — build it yourself

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

## Your task spec: what is left (the quests)

Tick each when it works in the browser AND `ng build` passes.

| Quest | Status | Where / next step |
|---|---|---|
| Auth: Login, Register, Forgot password | ✅ done | |
| Auth: **Change password** | ⬜ | `TODO(profile-1)` in ProfileService + `change-password-form` in the profile page |
| **Homepage** | 🟡 4 of 6 sections | left: **Featured Products** grid (`TODO(home-featured)`, ask me the "which products?" rule: sort by `-sold`, `-ratingsAverage` or default), **Newsletter** (`TODO(home-newsletter)`) |
| **Products** page | ⬜ | `TODO(products-1)` then `TODO(products)`: list, pagination, `?keyword=` from the navbar search |
| **Product details** | ⬜ | `TODO(product-details-1)` + `TODO(product-details)`: `:id` as `input()`, gallery, reviews tab |
| **Brands** + Brand details | ⬜ | `TODO(brands-1)`, `TODO(brands)`, `TODO(brand-details-1)`, `TODO(brand-details)` |
| **Categories** + Category details | ⬜ | `TODO(categories-1)`, `TODO(categories)`, `TODO(category-details)` (+ subcategory chips) |
| **Cart:** display, add, remove, update quantity | ⬜ | `TODO(cart-models)` → `TODO(cart-1..4)` → `TODO(cart)`; navbar badge reads `CartService.count` |
| **Wishlist:** display, add, remove | ⬜ | `TODO(wishlist-models)` → `TODO(wishlist-1..3)` → `TODO(wishlist)`; hearts on product cards |
| **Payment:** cash + online (Stripe) | ⬜ | `TODO(order-models)` → `TODO(payment-1)` cash → `TODO(payment-2)` Stripe → `TODO(payment)` checkout page |
| **Orders** page | ⬜ | `TODO(auth-verify)` (gives the user id) + `TODO(orders-1)` → `TODO(orders)` |
| "Use as many API endpoints as you can" | 🟡 | see the endpoint checklist below + Phase 5 bonuses |

## Order to build (each step uses what the previous one taught)

### Phase 1 — Read data (GET, httpResource, route params)
1. [ ] `TODO(products-1)` ProductService.getProducts → `TODO(products)` products page with pagination
2. [ ] `TODO(product-details-1)` + `TODO(product-details)` — route param as `input()`, httpResource, gallery
3. [ ] `TODO(categories-1)` + `TODO(categories)` + `TODO(category-details)`
4. [ ] `TODO(brands-1)` + `TODO(brands)` + `TODO(brand-details-1)` + `TODO(brand-details)`
5. [ ] Finish `TODO(home)`: featured products (`@defer (on viewport)`), newsletter section — the other 4 sections are done

### Phase 2 — Shared state (signals in services, tap, navbar badges)
6. [ ] `TODO(cart-models)` → `TODO(cart-1..4)` in CartService → `TODO(cart)` page
7. [ ] `TODO(wishlist-models)` → `TODO(wishlist-1..3)` → `TODO(wishlist)` page + hearts on cards
8. [ ] Wire "Add to cart" / heart buttons on every page that uses `<app-product-card>`
9. [ ] On logout, reset the cart + wishlist state (the comment in `AuthService.signOut()`: `TODO(cart-4 / wishlist-3)`)

### Phase 3 — Profile (more Signal Forms)
10. [ ] `TODO(profile-1)` + `TODO(profile-2)` → `TODO(profile)` page (+ child components): change password, update name / email / phone

### Phase 4 — Money
11. [ ] `TODO(order-models)` → `TODO(payment-1)` cash order → `TODO(payment-2)` Stripe → `TODO(payment)` checkout page
12. [ ] `TODO(auth-verify)` + `TODO(orders-1)` → `TODO(orders)` page (`/profile/orders`)

### Phase 5 — Bonus (the task says: use as many endpoints as you can)
13. [ ] Product reviews: list + add (`/products/:id/reviews`), edit/delete own review (`/reviews/:id`)
14. [ ] Saved addresses: `TODO(address-models)` + `TODO(address-1)`, pick one at checkout
15. [ ] Cart v2 + coupon (`PUT /api/v2/cart/applyCoupon`; the promo codes on the home banners are only text for now)
16. [ ] Products: sort + filter by brand/category/price (`TODO(products-2)`; add `price[gte]`, `price[lte]` and `fields` to `ProductQuery`)
17. [ ] Route transitions (`withViewTransitions()`) — ⚠ it hung guard redirects during setup; if you add it
      back, test opening `/cart` while logged out

## Loose ends (small things noticed along the way)

- [ ] **Remove the `console.log` checks** when a part is finished (home, category slider, hero slider, forgot password, spinner interceptor)
- [ ] **Load the navbar's Categories dropdown from the API** (`TODO(navbar-1)`; it uses 4 hard-coded ids now)
- [ ] **Feature strip position:** the demo shows it right under the hero on the home page; ours is in the footer layout on every page
- [ ] **Expired token (401):** nothing signs the user out yet. When you meet it, add the sign-out in `error.interceptor.ts` (the file has a comment)
- [ ] **Social buttons** (Google / Facebook) are drawn but do nothing — remove them or leave them like the demo
- [ ] **Test a real login and a real forgot-password** against the API (everything so far was tested with faked replies)
- [ ] **Deploy:** commit everything, push, check Vercel; add your real domain to `security.allowedHosts` in `angular.json`
- [ ] **Keep the home page lean:** `HomeComponent` still has the products request; move it into the featured-products component when you build that

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
| [ ] | GET /auth/verifyToken | [ ] | GET /cart |
| [x] | GET /categories | [ ] | POST /cart |
| [ ] | GET /categories/:id | [ ] | PUT /cart/:id |
| [ ] | GET /categories/:id/subcategories | [ ] | DELETE /cart/:id |
| [ ] | GET /subcategories(/:id) | [ ] | DELETE /cart |
| [ ] | GET /brands | [ ] | PUT /v2/cart/applyCoupon |
| [ ] | GET /brands/:id | [ ] | POST /orders/:cartId (cash) |
| [x] | GET /products | [ ] | POST /orders/checkout-session/:cartId |
| [ ] | GET /products/:id | [ ] | GET /orders/user/:userId |
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
- works on a phone-width screen; icon buttons have `aria-label`
