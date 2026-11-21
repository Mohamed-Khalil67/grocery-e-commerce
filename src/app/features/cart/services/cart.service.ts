import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AddToCartResponse, CartResponse } from '../models/cart.interface';

/**
 * Cart API + cart state. The NAVBAR shows the count, so this service is injected there too.
 *
 *   GET    /cart                 · POST /cart { productId }
 *   PUT    /cart/:productId { count }  ·  DELETE /cart/:productId
 *
 * Every method returns an Observable (the caller subscribes). `tap` copies `numOfCartItems`
 * from each reply into the `count` signal, so the badge updates by itself.
 */
@Service()
export class CartService {
  private readonly http = inject(HttpClient);

  private readonly _count = signal(0);
  /** Number of items, shown on the navbar badge (already wired in navbar.component.html). */
  readonly count = this._count.asReadonly();

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>('/cart').pipe(tap((res) => this._count.set(res.numOfCartItems)));
  }

  addToCart(productId: string): Observable<AddToCartResponse> {
    return this.http
      .post<AddToCartResponse>('/cart', { productId })
      .pipe(tap((res) => this._count.set(res.numOfCartItems)));
  }

  /** The docs send `count` as text, so we do too. */
  updateQuantity(productId: string, count: number): Observable<CartResponse> {
    return this.http
      .put<CartResponse>(`/cart/${productId}`, { count: String(count) })
      .pipe(tap((res) => this._count.set(res.numOfCartItems)));
  }

  removeItem(productId: string): Observable<CartResponse> {
    return this.http
      .delete<CartResponse>(`/cart/${productId}`)
      .pipe(tap((res) => this._count.set(res.numOfCartItems)));
  }

  /** Called when the user logs out. */
  reset(): void {
    this._count.set(0);
  }

  // TODO(cart-clear): clearCart() → DELETE /cart (its reply has no count: set it to 0 yourself). Add it with checkout.
  // TODO(cart-id): checkout needs the cart id (`data._id` of the reply). Add it when you build checkout.
}
