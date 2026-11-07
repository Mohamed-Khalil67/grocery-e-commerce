import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Categories + subcategories API. Used by: home (category slider), categories, category-details, navbar dropdown.
 *
 *   GET /categories · GET /categories/:id · GET /categories/:id/subcategories
 *   GET /subcategories · GET /subcategories/:id
 */
@Service()
export class CategoryService {
  private readonly http = inject(HttpClient);

  // TODO(categories-1): getCategories()
  // TODO(category-details-1): getCategory(id), getSubcategories(categoryId)
}
