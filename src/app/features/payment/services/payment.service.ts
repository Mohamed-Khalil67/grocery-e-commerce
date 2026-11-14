import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashOrderResponse, CheckoutSessionResponse, ShippingAddress } from '../../orders/models/order.interface';

/**
 * Creates an order: cash on delivery or online (Stripe). Both need the login token and the cart id.
 * Reply shapes are from the docs, not verified with a login yet.
 *
 *   POST /orders/:cartId                                body { shippingAddress }  → cash order
 *   POST /orders/checkout-session/:cartId?url=<origin>  body { shippingAddress }  → { session: { url } }
 */
@Service()
export class PaymentService {
  private readonly http = inject(HttpClient);

  createCashOrder(cartId: string, shippingAddress: ShippingAddress): Observable<CashOrderResponse> {
    return this.http.post<CashOrderResponse>(`/orders/${cartId}`, { shippingAddress });
  }

  /**
   * Online payment. `returnUrl` is where Stripe sends the user back to after paying (your site's address).
   * After this call, send the browser to `reply.session.url`.
   */
  createCheckoutSession(cartId: string, shippingAddress: ShippingAddress, returnUrl: string): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(
      `/orders/checkout-session/${cartId}`,
      { shippingAddress },
      { params: { url: returnUrl } },
    );
  }
}
