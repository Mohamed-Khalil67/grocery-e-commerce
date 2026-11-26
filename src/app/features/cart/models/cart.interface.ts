/**
 * Cart models. NOT verified with a real login yet: compare with the `[api]` console lines and fix what differs.
 * The API sends more fields than these; extra fields are simply ignored.
 */

/**
 * The product inside a cart line. Only GET /cart sends all of this: the PUT / DELETE replies
 * have the same product WITHOUT `quantity`, and POST sends just the product id.
 */
export interface CartProduct {
  readonly _id: string;
  readonly title: string;
  readonly imageCover: string;
  readonly category: { readonly name: string };
  /** Stock available (the max for the quantity stepper). */
  readonly quantity: number;
}

/** The part of a cart row that EVERY reply has (POST sends `product` as an id only, GET sends the full product). */
export interface CartLineCount {
  readonly count: number;
}

/** One row of the cart. */
export interface CartLine extends CartLineCount {
  /** Price of ONE unit. */
  readonly price: number;
  readonly product: CartProduct;
}

/** What GET /cart answers (PUT / DELETE answer almost the same, but without `quantity`: we only read their rows' `count`). */
export interface CartResponse {
  readonly numOfCartItems: number;
  readonly data: {
    readonly _id: string;
    readonly totalCartPrice: number;
    readonly products: readonly CartLine[];
  };
}

/** What DELETE /cart answers (not verified: we ignore it, success is all we need). */
export interface ClearCartResponse {
  readonly message: string;
}

/** What POST /cart answers. We only read each row's `count`, so only that is typed. */
export interface AddToCartResponse {
  readonly numOfCartItems: number;
  readonly data: {
    readonly products: readonly CartLineCount[];
  };
}
