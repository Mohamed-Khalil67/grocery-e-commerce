import { computed, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AddToCartResponse, CartLineCount, CartResponse, ClearCartResponse } from '../models/cart.interface';

/**
 * Cart API + cart state. ONE instance for the whole app (@Service), so the navbar and every page
 * read the same signals.
 *
 *   GET    /cart                 · POST /cart { productId }
 *   PUT    /cart/:productId { count }  ·  DELETE /cart/:productId  ·  DELETE /cart (clear)
 *
 * Every method returns an Observable (the caller subscribes). `tap` saves the rows of each reply
 * in the `lines` signal; `count` is computed from them, so the badge updates by itself.
 */
@Service()
export class CartService {
  private readonly http = inject(HttpClient);

  /** STATE: the rows of the cart, as the last reply sent them. */
  private readonly lines = signal<readonly CartLineCount[]>([]);

  readonly count = computed(() => {
    return this.lines().reduce((total, line) => {
      return total + line.count
    },0)
  });

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>('/cart').pipe(tap((res) => this.lines.set(res.data.products)));
  }

  addToCart(productId: string): Observable<AddToCartResponse> {
    return this.http
      .post<AddToCartResponse>('/cart', { productId })
      .pipe(tap((res) => this.lines.set(res.data.products)));
  }

  /** The docs send `count` as text, so we do too. */
  updateQuantity(productId: string, count: number): Observable<CartResponse> {
    return this.http
      .put<CartResponse>(`/cart/${productId}`, { count: String(count) })
      .pipe(tap((res) => this.lines.set(res.data.products)));
  }

  removeItem(productId: string): Observable<CartResponse> {
    return this.http
      .delete<CartResponse>(`/cart/${productId}`)
      .pipe(tap((res) => this.lines.set(res.data.products)));
  }

  /** DELETE /cart: its reply has no rows, so we empty `lines` ourselves. */
  clearCart(): Observable<ClearCartResponse> {
    return this.http.delete<ClearCartResponse>('/cart').pipe(tap(() => this.lines.set([])));
  }

  /** Called when the user logs out. */
  reset(): void {
    this.lines.set([]);
  }
}
