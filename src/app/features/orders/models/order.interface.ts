/*
 * TODO(order-models): model orders and shipping addresses.
 *
 *   ShippingAddress: { details: string; phone: string; city: string; postalCode?: string }
 *
 *   POST /orders/:cartId                        body { shippingAddress } → cash order
 *   POST /orders/checkout-session/:cartId?url=… body { shippingAddress } → { status, session: { url } }
 *   GET  /orders/user/:userId                   → Order[]   (an array, NOT wrapped in { data })
 *
 *   Order (partial): { _id, id, totalOrderPrice, paymentMethodType: 'cash' | 'card',
 *                      isPaid, isDelivered, createdAt, shippingAddress, cartItems: [...] }
 *
 * Use string-literal unions (not enums) for paymentMethodType (see AGENTS.md).
 */
export {};
