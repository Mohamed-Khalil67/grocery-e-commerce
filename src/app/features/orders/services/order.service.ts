import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Orders API.
 *
 *   GET /orders/user/:userId → that user's orders   ·   GET /orders → all orders (optional)
 */
@Service()
export class OrderService {
  private readonly http = inject(HttpClient);

  // TODO(orders-1): getUserOrders(userId) — userId comes from AuthService.verifyToken()
}
