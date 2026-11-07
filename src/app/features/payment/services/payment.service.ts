import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Creates an order: cash on delivery or online (Stripe).
 *
 *   POST /orders/:cartId                                body { shippingAddress }  → cash order
 *   POST /orders/checkout-session/:cartId?url=<origin>  body { shippingAddress }  → { session: { url } }
 */
@Service()
export class PaymentService {
  private readonly http = inject(HttpClient);

  // TODO(payment-1): createCashOrder(cartId, shippingAddress)
  // TODO(payment-2): createCheckoutSession(cartId, shippingAddress) — then window.location.href = res.session.url
}
