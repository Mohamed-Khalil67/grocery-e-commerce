import {Component, inject, input} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {CartService} from '../../../cart/services/cart.service';
import {BrandService} from '../../services/brand.service';
import {ProductService} from '../../../shop/services/product.service';
import {PageHeaderComponent} from '../../../../shared/ui/page-header/page-header.component';
import {ProductCardComponent} from '../../../../shared/components/product-card/product-card.component';

/**
 * 🎯 TODO(brand-details) — Brand details
 *
 * Objective
 *   One brand and its products. (The demo has no such page — its brand cards link to /products?brand=id. The task asks for a Brand Details page, so build it.)
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Violet header with the brand logo + name, then a grid of its products.
 *
 * Done when
 *   - Header + products grid with <app-product-card>.
 *   - Empty state when the brand has no products.
 *
 * Endpoints
 *   - GET /brands/:id
 *   - GET /products?brand=:id
 *
 * Concepts you'll practice
 *   - Two requests from one route param
 *
 * Do first: TODO(brand-details-1)
 *
 * Stuck? ask "hint for TODO(brand-details)" · done? ask "review TODO(brand-details)".
 */
@Component({
  imports: [PageHeaderComponent, ProductCardComponent],
  selector: 'app-brand-details',
  styleUrl: './brand-details.component.css',
  templateUrl: './brand-details.component.html',
})
export class BrandDetailsComponent {
  private readonly brandService = inject(BrandService);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // /brands/:id → the router puts the id here
  readonly id = input.required<string>();

  // Two requests from the same id: both reload by themselves when it changes.
  protected readonly brand = rxResource({
    params: () => this.id(),
    stream: ({params}) => this.brandService.getBrand(params),
  });

  protected readonly products = rxResource({
    params: () => this.id(),
    stream: ({params}) => this.productService.getProducts(1, {brand: params}),
  });

  /** The card emits the product id. Guests go to /login; the badge updates by itself (CartService `tap`). */
  protected onAddToCart(productId: string): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    console.log('[cart] add →', productId, '| count before:', this.cart.count());
    this.cart.addToCart(productId).subscribe({
      next: (reply) => {
        console.log('[cart] reply →', reply, '| count after:', this.cart.count());
      },
      error: () => {}, // the error interceptor already showed the toast
      complete: () => {},
    });
  }
}
