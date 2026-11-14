import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiItemResponse, ApiListResponse } from '../../../core/models/api-response.interface';
import { Brand } from '../../../core/models/brand.interface';

/**
 * Brands API. 54 brands, 40 per page → 2 pages.
 *
 *   GET /brands ?page=   ·   GET /brands/:id
 *
 * Only returns Observables: the request is sent when somebody subscribes.
 */
@Service()
export class BrandService {
  private readonly http = inject(HttpClient);

  /** One page of brands. getBrands() is page 1, getBrands(2) is page 2. */
  getBrands(page = 1): Observable<ApiListResponse<Brand>> {
    return this.http.get<ApiListResponse<Brand>>('/brands', { params: { page } });
  }

  /** One brand by id. */
  getBrand(id: string): Observable<ApiItemResponse<Brand>> {
    return this.http.get<ApiItemResponse<Brand>>(`/brands/${id}`);
  }
}
