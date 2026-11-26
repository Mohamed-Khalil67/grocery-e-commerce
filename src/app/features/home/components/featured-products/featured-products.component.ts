import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
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
  private readonly cart = inject(CartService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly wishlist = inject(WishlistService);

  protected readonly products = rxResource({
    stream: () => this.productService.getProducts(1, { sort: '-sold', limit: 10 }),
  });

  // grey placeholders shown while the request is running
  protected readonly placeholders: readonly number[] = Array.from({ length: 10 }, (_, index) => index);

  /** The card emits the product id. Guests go to /login; the badge updates by itself (CartService `tap`). */
  protected onAddToCart(productId: string): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    console.log('[cart] add →', productId, '| count before:', this.cart.count());
    this.cart.addToCart(productId).subscribe({
      next: (reply) => {
        console.log('[cart] reply →', reply);
      },
      error: () => {}, // the error interceptor already showed the toast
      complete: () => {},
    });
  }

  /** The heart on a card: guests go to /login; otherwise add the product, or remove it if it is already saved. */
  protected onToggleWishlist(productId: string): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const saved = this.wishlist.ids().includes(productId);
    console.log('[wishlist]', saved ? 'remove' : 'add', productId, '| ids before:', this.wishlist.ids());

    const request = saved ? this.wishlist.remove(productId) : this.wishlist.add(productId);
    request.subscribe({
      next: (reply) => {
        console.log('[wishlist] reply →', reply);
      },
      error: () => {}, // the error interceptor already showed the toast
      complete: () => {},
    });
  }
}
