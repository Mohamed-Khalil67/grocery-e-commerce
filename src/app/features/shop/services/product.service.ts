import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiItemResponse, ApiListResponse } from '../../../core/models/api-response.interface';
import { Product, ProductQuery } from '../../../core/models/product.interface';

/**
 * Products API. Used by: home, products, product-details, brand-details, category-details.
 *
 *   GET /products   ?page=
 *   GET /products/:id
 *
 * The paths are short: the base-url interceptor adds https://ecommerce.routemisr.com/api/v1 in front.
 * Both methods only return an Observable: the request is sent when somebody subscribes.
 *
 * Kept simple: only `page` for now. Add sort / brand / category / price params when you build the filters
 * (the full list is in the `ProductQuery` type, from the Postman docs).
 */
@Service()
export class ProductService {
  private readonly http = inject(HttpClient);

  /**
   * One page of products (40 per page). getProducts() is page 1, getProducts(2) is page 2.
   * `filters` adds any other query param, e.g. getProducts(1, { 'category[in]': id }).
   */
  getProducts(page = 1, filters: Omit<ProductQuery, 'page'> = {}): Observable<ApiListResponse<Product>> {
    return this.http.get<ApiListResponse<Product>>('/products', { params: { ...filters, page } });
  }

  /** One product by id. The answer also contains its reviews. */
  getProduct(id: string): Observable<ApiItemResponse<Product>> {
    return this.http.get<ApiItemResponse<Product>>(`/products/${id}`);
  }
}
