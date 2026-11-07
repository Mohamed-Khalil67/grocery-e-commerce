import { Component } from '@angular/core';

/**
 * 🎯 TODO(orders) — My orders
 *
 * Objective
 *   The user sees every order they placed. Route: /profile/orders (also reachable at /allorders). Behind login in the demo.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - One components/order-card per order, each with child components/order-item-row lines.
 *
 * Done when
 *   - Newest first, empty state.
 *
 * Endpoints
 *   - GET /auth/verifyToken → decoded.id
 *   - GET /orders/user/:userId
 *
 * Concepts you'll practice
 *   - Chaining two requests
 *   - DatePipe / DecimalPipe
 *
 * Do first: TODO(auth-verify), TODO(orders-1)
 *
 * Stuck? ask "hint for TODO(orders)" · done? ask "review TODO(orders)".
 */
@Component({
  imports: [],
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {}
