import { computed, inject, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { AddToCartResponse, CartResponse, ClearCartResponse } from '../models/cart.interface';

/**
 * Cart API + cart state. ONE instance for the whole app (@Service), so the navbar badge and the
 * cart page read the same data.
 *
 *   GET    /cart                 · POST /cart { productId }
 *   PUT    /cart/:productId { count }  ·  DELETE /cart/:productId  ·  DELETE /cart (clear)
 *
 * `cart` is a resource that loads GET /cart BY ITSELF while somebody is logged in (its `params` is
 * the token) and goes idle when nobody is. `count` is computed from it. Every change (add, update,
 * remove) reloads the cart, because the POST / PUT / DELETE replies are missing data (the stock).
 */
@Service()
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  /** GET /cart. No token (a guest) → `params` is undefined → the request does not run. */
  readonly cart = rxResource({
    params: () => this.auth.token(),
    stream: () => this.http.get<CartResponse>('/cart'),
  });

  /**
   * TOTAL quantity, shown on the navbar badge. Rows with count 1, 5, 3 → 9.
   * (Not `numOfCartItems`: that is only the number of different products → 3.)
   */
  readonly count = computed(() => {
    const rows = this.cart.value()?.data.products ?? [];
    return rows.reduce((total, row) => total + row.count, 0);
  });

  addToCart(productId: string): Observable<AddToCartResponse> {
    return this.http
      .post<AddToCartResponse>('/cart', { productId })
      .pipe(tap(() => this.cart.reload()));
  }

  /** The docs send `count` as text, so we do too. */
  updateQuantity(productId: string, count: number): Observable<CartResponse> {
    return this.http
      .put<CartResponse>(`/cart/${productId}`, { count: String(count) })
      .pipe(tap(() => this.cart.reload()));
  }

  removeItem(productId: string): Observable<CartResponse> {
    return this.http
      .delete<CartResponse>(`/cart/${productId}`)
      .pipe(tap(() => this.cart.reload()));
  }

  /** DELETE /cart: its reply has no cart, so we empty the resource ourselves (nothing to reload). */
  clearCart(): Observable<ClearCartResponse> {
    return this.http.delete<ClearCartResponse>('/cart').pipe(tap(() => this.cart.set(undefined)));
  }
}
