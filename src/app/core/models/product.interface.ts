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
 * Query params GET /products accepts (from the Postman docs).
 * Every field is optional: send only what you need.
 *
 *   page, limit        paging (the API default is 40 per page)
 *   sort               'price' or '-price' (the minus means high to low), 'sold', '-sold', '-ratingsAverage'
 *   brand              a brand id
 *   category[in]       a category id
 *   price[gte/lte]     price range (greater / less than or equal)
 *   fields             choose which fields come back, e.g. 'title,price'
 *   keyword            documented, but the API returns 0 products for it, so we do not use it
 *
 * TODO(products-2): use sort / brand / category / price on the products page.
 */
export type ProductQuery = {
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: 'price' | '-price' | 'sold' | '-sold' | '-ratingsAverage';
  readonly keyword?: string;
  readonly brand?: string;
  readonly 'category[in]'?: string;
  readonly 'price[gte]'?: number;
  readonly 'price[lte]'?: number;
  readonly fields?: string;
};
