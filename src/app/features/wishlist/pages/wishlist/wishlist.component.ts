import { Component } from '@angular/core';

/**
 * 🎯 TODO(wishlist) — Wishlist
 *
 * Objective
 *   See saved products, remove them or move them to the cart.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Empty: heart icon box, "Your wishlist is empty", "Browse products and save your favorites here. Sign in to sync your wishlist across devices.", green "Browse Products →" and "Sign In" buttons.
 *   - Filled wishlist is behind login in the demo — not inspected.
 *
 * Done when
 *   - Items with remove + "Add to cart".
 *   - Hearts on every card reflect the wishlist.
 *
 * Endpoints
 *   - GET /wishlist
 *   - DELETE /wishlist/:productId
 *   - POST /cart
 *
 * Concepts you'll practice
 *   - Optimistic UI vs waiting for the server
 *
 * Do first: TODO(wishlist-models), TODO(wishlist-1)
 *
 * Stuck? ask "hint for TODO(wishlist)" · done? ask "review TODO(wishlist)".
 */
@Component({
  imports: [],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {}
