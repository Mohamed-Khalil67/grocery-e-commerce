import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.interface';

/**
 * Orders API.
 *
 *   GET /orders/user/:userId → that user's orders (an array, not wrapped in { data })
 *
 * The user id comes from GET /auth/verifyToken (TODO(auth-verify)).
 * Reply shape is from the docs, not verified with a login yet.
 */
@Service()
export class OrderService {
  private readonly http = inject(HttpClient);

  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`/orders/user/${userId}`);
  }
}
