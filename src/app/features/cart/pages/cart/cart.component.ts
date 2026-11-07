import { Component } from '@angular/core';

/**
 * 🎯 TODO(cart) — Shopping cart
 *
 * Objective
 *   See, change and empty the cart, then go to checkout.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Logged-out / empty: centered gray box icon, "Your cart is empty", "Looks like you haven't added anything to your cart yet. Start exploring our products!", green "Start Shopping →" button (use <app-empty-state>).
 *   - Filled cart is behind login in the demo — not inspected; use components/cart-item + components/cart-summary.
 *
 * Done when
 *   - Items with quantity −/+ and remove.
 *   - Total + count; Clear cart; Checkout → /checkout/:cartId.
 *   - Navbar badge updates after every change.
 *
 * Endpoints
 *   - GET /cart
 *   - PUT /cart/:productId { count }
 *   - DELETE /cart/:productId
 *   - DELETE /cart
 *
 * Concepts you'll practice
 *   - Service state + tap()
 *   - "busy id" signal
 *
 * Do first: TODO(cart-models), TODO(cart-1..4)
 * Bonus: Coupon: PUT /api/v2/cart/applyCoupon { couponName }.
 *
 * Stuck? ask "hint for TODO(cart)" · done? ask "review TODO(cart)".
 */
@Component({
  imports: [],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {}
