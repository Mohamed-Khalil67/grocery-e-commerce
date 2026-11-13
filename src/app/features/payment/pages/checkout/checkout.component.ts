import { Component } from '@angular/core';

/**
 * 🎯 TODO(payment) — Checkout
 *
 * Objective
 *   Collect a shipping address and pay — cash on delivery or online (Stripe). (Behind login in the demo — design it in the same style.)
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - components/shipping-form + components/payment-method-picker on the left, components/order-summary on the right.
 *
 * Done when
 *   - Cash → order created → cart badge 0 → /profile/orders.
 *   - Online → redirect to Stripe (session.url).
 *
 * Endpoints
 *   - POST /orders/:cartId
 *   - POST /orders/checkout-session/:cartId?url=<origin>
 *   - GET/POST /addresses (bonus)
 *
 * Concepts you'll practice
 *   - Route param input
 *   - Exhaustive switch over 'cash' | 'card'
 *
 * Do first: TODO(order-models), TODO(payment-1), TODO(payment-2)
 *
 * Stuck? ask "hint for TODO(payment)" · done? ask "review TODO(payment)".
 */
@Component({
  imports: [],
  selector: 'app-checkout',
  styleUrl: './checkout.component.css',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {}
