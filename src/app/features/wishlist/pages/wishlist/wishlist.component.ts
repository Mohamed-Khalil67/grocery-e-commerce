import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistItemComponent } from '../../components/wishlist-item/wishlist-item.component';
import { WishlistService } from '../../services/wishlist.service';

/**
 * Wishlist page. The list lives in WishlistService (the navbar badge and the hearts read the same
 * data), the rows only display and emit, and this page tells the services what to do. After every
 * remove the service reloads the list, so the page just redraws.
 */
@Component({
  imports: [RouterLink, EmptyStateComponent, WishlistItemComponent],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {
  protected readonly auth = inject(AuthService);
  private readonly wishlist = inject(WishlistService);
  private readonly cart = inject(CartService);

  /** The same GET /wishlist resource the badge and the hearts use: no second request for this page. */
  protected readonly products = this.wishlist.products;

  /** The wishlisted products to show (empty while loading or when nothing is saved). */
  protected readonly items = computed(() => this.products.value()?.data ?? []);

  protected onRemove(productId: string): void {
    console.log('[wishlist page] remove', productId);
    this.wishlist.remove(productId).subscribe({
      next: (reply) => {
        console.log('[wishlist page] reply →', reply);
      },
      error: () => {}, // the error interceptor already showed the toast
      complete: () => {},
    });
  }

  /** The product stays in the wishlist: this only adds it to the cart. */
  protected onAddToCart(productId: string): void {
    console.log('[wishlist page] add to cart', productId);
    this.cart.addToCart(productId).subscribe({
      next: (reply) => {
        console.log('[wishlist page] cart reply →', reply);
      },
      error: () => {},
      complete: () => {},
    });
  }
}
