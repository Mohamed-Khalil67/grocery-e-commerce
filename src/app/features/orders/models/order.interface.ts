/**
 * Orders. Shape from the Route API docs, NOT verified with a login yet:
 * after you place an order, open DevTools > Network > /orders/user/... and compare.
 *
 *   POST /orders/:cartId                        body { shippingAddress } → cash order
 *   POST /orders/checkout-session/:cartId?url=… body { shippingAddress } → { status, session: { url } }
 *   GET  /orders/user/:userId                   → Order[]   (an array, NOT wrapped in { data })
 */

/** Where to deliver. Sent when creating an order. */
export interface ShippingAddress {
  readonly details: string;
  readonly phone: string;
  readonly city: string;
  readonly postalCode?: string;
}

/** A string-literal union instead of an enum (see AGENTS.md). */
export type PaymentMethod = 'cash' | 'card';

/** Partial: only the fields we know about. TODO(order-models): add `cartItems` after you see a real order. */
export interface Order {
  readonly _id: string;
  readonly id: number;
  readonly totalOrderPrice: number;
  readonly paymentMethodType: PaymentMethod;
  readonly isPaid: boolean;
  readonly isDelivered: boolean;
  readonly createdAt: string;
  readonly shippingAddress: ShippingAddress;
}

/** Reply of POST /orders/checkout-session/:cartId. */
export interface CheckoutSessionResponse {
  readonly status: string;
  readonly session: { readonly url: string };
}

/** Reply of POST /orders/:cartId (cash): we only care that it worked. */
export interface CashOrderResponse {
  readonly status: string;
}
