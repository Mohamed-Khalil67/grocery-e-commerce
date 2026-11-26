import { Product } from '../../../core/models/product.interface';

/** GET /wishlist: the FULL products (verified with a real login). */
export interface WishlistResponse {
  readonly status: string;
  readonly count: number;
  readonly data: readonly Product[];
}

/** POST /wishlist { productId } and DELETE /wishlist/:productId: only product IDS. */
export interface WishlistIdsResponse {
  readonly status: string;
  readonly message: string;
  readonly data: readonly string[];
}
