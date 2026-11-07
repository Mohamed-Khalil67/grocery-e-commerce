/*
 * TODO(wishlist-models): model the wishlist responses.
 *
 *   GET    /wishlist             → { status, count, data: Product[] }
 *   POST   /wishlist {productId} → { status, message, data: string[] }   // only ids!
 *   DELETE /wishlist/:productId  → { status, message, data: string[] }   // only ids!
 *
 * Tip: keep the wishlisted ids in WishlistService so every product card
 * can show a filled heart without refetching.
 */
export {};
