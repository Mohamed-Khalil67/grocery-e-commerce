import { Brand } from './brand.interface';
import { Category, Subcategory } from './category.interface';

/** Verified against GET /products. `id` and `_id` hold the same value. */
export interface Product {
  readonly _id: string;
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly quantity: number;
  readonly price: number;
  /** Only present when the product is on sale. */
  readonly priceAfterDiscount?: number;
  readonly imageCover: string;
  readonly images: readonly string[];
  readonly category: Category;
  readonly brand: Brand;
  readonly subcategory: readonly Subcategory[];
  readonly ratingsAverage: number;
  readonly ratingsQuantity: number;
  readonly sold: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Query params GET /products accepts.
 * TODO(products-2): use this when you add sorting / filtering / paging to the products page.
 * Hint: `brand` and `category[in]` filter by id, `sort` takes `price` or `-price`.
 */
export interface ProductQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: 'price' | '-price' | 'sold' | '-sold' | '-ratingsAverage';
  readonly keyword?: string;
  readonly brand?: string;
  readonly 'category[in]'?: string;
}
