import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Products API. Used by: home, products, product-details, brand-details, category-details.
 *
 *   GET /products   ?page=&limit=&sort=&keyword=&brand=&category[in]=
 *   GET /products/:id
 */
@Service()
export class ProductService {
  private readonly http = inject(HttpClient);

  // TODO(products-1): getProducts(query?) → Observable<ApiListResponse<Product>>  (ProductQuery is in core/models/product.interface.ts)
  // TODO(product-details-1): getProduct(id) → Observable<ApiItemResponse<Product>>  (or use httpResource in the page)
}
