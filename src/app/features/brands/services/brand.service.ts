import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Brands API. 54 brands → paginate.
 *
 *   GET /brands ?page=&limit=   ·   GET /brands/:id
 */
@Service()
export class BrandService {
  private readonly http = inject(HttpClient);

  // TODO(brands-1): getBrands(page)
  // TODO(brand-details-1): getBrand(id)
}
