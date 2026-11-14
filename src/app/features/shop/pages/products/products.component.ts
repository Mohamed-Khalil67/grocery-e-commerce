import { Component, computed, effect, inject, input, numberAttribute } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import {PaginationComponent} from '../../../../shared/ui/pagination/pagination.component';

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
  imports: [PageHeaderComponent, ProductCardComponent, PaginationComponent],
  selector: 'app-products',
  styleUrl: './products.component.css',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly productService = inject(ProductService);

  // The URL is  /products?page=2&keyword=shawl  (withComponentInputBinding puts those values in these inputs).
  // When the URL does not have them, the router sets the inputs to `undefined`, so each input has a `transform`
  // that gives it a safe value: page falls back to 1, keyword to ''.
  readonly page = input(1, { transform: (value: string | undefined) => numberAttribute(value, 1) });
  readonly keyword = input('', { transform: (value: string | undefined) => value ?? '' });

  // ONE request: the products of the current page (40). It runs again by itself when `page` changes.
  // The API has no search, so `keyword` is NOT sent to it.
  protected readonly products = rxResource({
    params: () => this.page(),
    stream: ({ params }) => this.productService.getProducts(params),
  });

  // The search happens here, in the browser: the same loaded products, filtered by title.
  // It is not a second request: it recalculates when the products or the keyword change.
  protected readonly filteredProducts = computed(() => {
    const products = this.products.value()?.data ?? [];
    const word = this.keyword().toLowerCase();
    return products.filter((product) => product.title.toLowerCase().includes(word));
  });
}
