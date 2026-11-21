/**
 * Cart models. NOT verified with a real login yet: compare with the `[api]` console lines and fix what differs.
 * The API sends more fields than these; extra fields are simply ignored.
 */

/** The product inside a cart line (GET /cart sends the full object). */
export interface CartProduct {
  readonly _id: string;
  readonly title: string;
  readonly imageCover: string;
  /** Stock available (the max for the quantity stepper). */
  readonly quantity: number;
}

/** One row of the cart. */
export interface CartLine {
  readonly count: number;
  /** Price of ONE unit. */
  readonly price: number;
  readonly product: CartProduct;
}

/** What GET /cart, PUT /cart/:id and DELETE /cart/:id answer. */
export interface CartResponse {
  readonly numOfCartItems: number;
  readonly data: {
    readonly _id: string;
    readonly totalCartPrice: number;
    readonly products: readonly CartLine[];
  };
}

/** What POST /cart answers: we only read the count (its `product` is just an id, so it is not typed here). */
export interface AddToCartResponse {
  readonly numOfCartItems: number;
}
