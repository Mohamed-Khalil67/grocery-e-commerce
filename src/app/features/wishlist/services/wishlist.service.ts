import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Wishlist API + state (navbar heart badge and every product card need it).
 *
 *   GET /wishlist → Product[]  ·  POST /wishlist { productId } → ids  ·  DELETE /wishlist/:productId → ids
 */
@Service()
export class WishlistService {
  private readonly http = inject(HttpClient);

  private readonly _ids = signal<readonly string[]>([]);
  /** Ids of wishlisted products — product cards use it to draw a filled / empty heart. */
  readonly ids = this._ids.asReadonly();

  // TODO(wishlist-1): getWishlist(), add(productId), remove(productId)  — POST/DELETE return the new id list → this._ids.set(...)
  // TODO(wishlist-3): reset() on sign out.
}
