import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Cart API + cart state. The NAVBAR shows the count, so this service is injected there too.
 *
 *   GET    /cart                 · POST /cart { productId }
 *   PUT    /cart/:productId { count }  ·  DELETE /cart/:productId  ·  DELETE /cart
 */
@Service()
export class CartService {
  private readonly http = inject(HttpClient);

  private readonly _count = signal(0);
  /** Number of items, shown on the navbar badge (already wired in navbar.component.html). */
  readonly count = this._count.asReadonly();

  // TODO(cart-1): getCart(), addToCart(productId), updateQuantity(productId, count), removeItem(productId), clearCart()
  //   Every response has `numOfCartItems` → this._count.set(...) inside tap() so the badge updates by itself.
  // TODO(cart-2): keep `cartId` (response.cartId) — checkout needs it.
  // TODO(cart-3): load the cart once after login / app start so the badge is right after a refresh.
  // TODO(cart-4): reset() → _count.set(0); call it from AuthService.signOut().
}
