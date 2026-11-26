import { computed, inject, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { WishlistIdsResponse, WishlistResponse } from '../models/wishlist.interface';

/**
 * Wishlist API + state. ONE instance for the whole app, so the navbar badge, the hearts on the
 * product cards and the wishlist page all read the same data.
 *
 *   GET    /wishlist              → full products
 *   POST   /wishlist { productId }→ the ids on the wishlist
 *   DELETE /wishlist/:productId   → the ids on the wishlist
 *
 * `products` is a resource that loads GET /wishlist BY ITSELF while somebody is logged in (its
 * `params` is the token) and goes idle when nobody is. `ids` is computed from it. Every change
 * (add, remove) reloads the list, so the hearts, the badge and the page always agree.
 */
@Service()
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  /** GET /wishlist. No token (a guest) → `params` is undefined → the request does not run. */
  readonly products = rxResource({
    params: () => this.auth.token(),
    stream: () => this.http.get<WishlistResponse>('/wishlist'),
  });

  /** Ids of wishlisted products: product cards use it to draw a filled / empty heart. */
  readonly ids = computed(() => (this.products.value()?.data ?? []).map((product) => product._id));

  add(productId: string): Observable<WishlistIdsResponse> {
    return this.http
      .post<WishlistIdsResponse>('/wishlist', { productId })
      .pipe(tap(() => this.products.reload()));
  }

  remove(productId: string): Observable<WishlistIdsResponse> {
    return this.http
      .delete<WishlistIdsResponse>(`/wishlist/${productId}`)
      .pipe(tap(() => this.products.reload()));
  }
}
