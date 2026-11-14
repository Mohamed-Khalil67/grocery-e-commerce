/** Verified against GET /products/:id/reviews. */
export interface Review {
  readonly _id: string;
  readonly review: string;
  /** 1 to 5 */
  readonly rating: number;
  /** The product id. */
  readonly product: string;
  readonly user: { readonly _id: string; readonly name: string };
  readonly createdAt: string;
  readonly updatedAt: string;
}
