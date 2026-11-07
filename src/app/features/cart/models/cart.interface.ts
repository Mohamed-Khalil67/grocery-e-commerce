/*
 * TODO(cart-models): model the cart responses. Look at the real JSON in the Network tab first.
 *
 *   GET /cart, POST /cart, PUT /cart/:productId, DELETE /cart/:productId all return roughly:
 *   {
 *     status: 'success',
 *     numOfCartItems: number,
 *     cartId: string,
 *     data: {
 *       _id: string,                 // same as cartId -> you need it for checkout
 *       cartOwner: string,
 *       totalCartPrice: number,
 *       products: [{ _id, count, price, product: Product-like object }]
 *     }
 *   }
 *
 * ⚠ POST /cart returns `product` as a plain id string, GET /cart returns the full object.
 *   Model both (e.g. two interfaces) so the compiler tells you which one you have.
 *
 * Suggested names: CartItem, Cart, CartResponse.
 */
export {};
