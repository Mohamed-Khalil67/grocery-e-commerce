import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { SectionTitleComponent } from '../../../../shared/ui/section-title/section-title.component';
import { ProductService } from '../../../shop/services/product.service';

/** "Featured Products": the 10 best-selling products (two rows of 5). Loads its own data. */
@Component({
  imports: [ProductCardComponent, SectionTitleComponent],
  selector: 'app-featured-products',
  styleUrl: './featured-products.component.css',
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent {
  private readonly productService = inject(ProductService);

  protected readonly products = rxResource({
    stream: () => this.productService.getProducts(1, { sort: '-sold', limit: 10 }),
  });

  // grey placeholders shown while the request is running
  protected readonly placeholders: readonly number[] = Array.from({ length: 10 }, (_, index) => index);
}
