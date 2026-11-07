import { Component } from '@angular/core';

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
  templateUrl: './products.component.html',
})
export class ProductsComponent {}
