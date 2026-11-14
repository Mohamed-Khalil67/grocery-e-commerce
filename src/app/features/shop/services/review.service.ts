import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiItemResponse, ApiListResponse } from '../../../core/models/api-response.interface';
import { Review } from '../models/review.interface';

/**
 * Reviews API (bonus). Used by the reviews tab on product-details.
 *
 *   GET  /products/:id/reviews  ?page=   → { results, metadata, data: Review[] }   (public)
 *   POST /products/:id/reviews           body { review, rating }                   (needs the login token)
 */
@Service()
export class ReviewService {
  private readonly http = inject(HttpClient);

  /** One page of a product's reviews. */
  getReviews(productId: string, page = 1): Observable<ApiListResponse<Review>> {
    return this.http.get<ApiListResponse<Review>>(`/products/${productId}/reviews`, { params: { page } });
  }

  /**
   * Add a review. The token header is added by the auth interceptor.
   * Not verified against the live API (it needs a login): check the real reply in the Network tab.
   */
  addReview(productId: string, review: string, rating: number): Observable<ApiItemResponse<Review>> {
    return this.http.post<ApiItemResponse<Review>>(`/products/${productId}/reviews`, { review, rating });
  }
}
