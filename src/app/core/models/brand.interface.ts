/** Verified against GET /brands. */
export interface Brand {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly image: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
