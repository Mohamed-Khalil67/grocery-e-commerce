import {Component, effect, inject, input, numberAttribute} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {httpResource} from '@angular/common/http';
import {ApiListResponse} from '../../../../core/models/api-response.interface';
import {Product} from '../../../../core/models/product.interface';

/**
 * 🎯 TODO(products) — All products
 *
 * Objective
 *   Browse every product, page by page.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Green <app-page-header> "All Products" / "Explore our complete product collection", crumbs Home / All Products.
 *   - "Showing 40 products", then a 5-column grid of <app-product-card>. The demo shows 40 per page (56 products → 2 pages).
 *
 * Done when
 *   - Grid + <app-pagination> (metadata.numberOfPages / currentPage).
 *   - Search from the navbar: ?keyword=… filters the list.
 *   - page / keyword live in the URL so a refresh keeps them.
 *
 * Endpoints
 *   - GET /products?page=&limit=&keyword=&sort=&brand=&category[in]=
 *
 * Concepts you'll practice
 *   - Query params as inputs (withComponentInputBinding is on)
 *   - httpResource(() => ({ url, params })) refetches when signals change
 *
 * Do first: TODO(products-1)
 * Bonus: TODO(products-2): sort by price, filter by brand/category.
 *
 * Stuck? ask "hint for TODO(products)" · done? ask "review TODO(products)".
 */
@Component({
  imports: [],
  selector: 'app-products',
  styleUrl: './products.component.css',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  // the URL is  /products?keyword=angular&page=2
  readonly keyword = input('');
  readonly page = input(1, { transform: numberAttribute });     // "2" arrives as text; this makes it the number 2

  protected readonly products = httpResource<ApiListResponse<Product>>(() => {
    // keyword is added only when the user typed one: an empty keyword= makes the API return 0 products
    const params: Record<string, string | number> = { page: this.page() };
    if (this.keyword()) {
      params['keyword'] = this.keyword();
    }
    return { url: '/products', params };
  });


  constructor() {
    // An effect re-runs whenever a signal it reads changes.
    // Here it reads `status()` and `value()`, so it logs when the request starts, finishes or fails.
    effect(() => {
      console.log('[products] status:', this.products.status());
      const res = this.products.value();
      if (res) {
        console.log('[products] loaded →', res.data.length, 'items. page', res.metadata.currentPage, 'of', res.metadata.numberOfPages);
        console.log('[home] first product →', res.data[0]?.title, '| price:', res.data[0]?.price);
      }
      if (this.products.error()) {
        console.log('[products] FAILED →', this.products.error());
      }
    });
  }
}
