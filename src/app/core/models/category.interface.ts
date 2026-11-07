/** Verified against GET /categories. */
export interface Category {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly image: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/** Verified against GET /subcategories. `category` is only the parent category id. */
export interface Subcategory {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly category: string;
}
