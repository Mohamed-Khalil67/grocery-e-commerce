import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Reviews API (bonus). Used by the reviews tab on product-details.
 *
 *   GET    /products/:id/reviews      → { results, metadata, data: Review[] }
 *   POST   /products/:id/reviews      body { review, rating }
 *   PUT    /reviews/:id   ·   DELETE /reviews/:id   (owner only)
 */
@Service()
export class ReviewService {
  private readonly http = inject(HttpClient);

  // TODO(reviews-1): getReviews(productId), addReview(productId, review, rating)
}
