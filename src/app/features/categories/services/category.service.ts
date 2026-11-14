import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiItemResponse, ApiListResponse } from '../../../core/models/api-response.interface';
import { Category, Subcategory } from '../../../core/models/category.interface';

/**
 * Categories + subcategories API. Used by: home (category slider), categories, category-details, navbar dropdown.
 *
 *   GET /categories · GET /categories/:id · GET /categories/:id/subcategories
 *
 * Only returns Observables: the request is sent when somebody subscribes.
 */
@Service()
export class CategoryService {
  private readonly http = inject(HttpClient);

  /** All 10 categories (they fit in one page). */
  getCategories(): Observable<ApiListResponse<Category>> {
    return this.http.get<ApiListResponse<Category>>('/categories');
  }

  /** One category by id. */
  getCategory(id: string): Observable<ApiItemResponse<Category>> {
    return this.http.get<ApiItemResponse<Category>>(`/categories/${id}`);
  }

  /**
   * The subcategories of one category.
   * Careful: this API sometimes answers with subcategories of OTHER categories too (60 mixed ones).
   * Each subcategory has a `category` field with its parent's id, so on the page keep only the ones
   * where `subcategory.category === categoryId`.
   */
  getSubcategories(categoryId: string): Observable<ApiListResponse<Subcategory>> {
    return this.http.get<ApiListResponse<Subcategory>>(`/categories/${categoryId}/subcategories`);
  }
}
