import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { CartService } from '../../services/cart.service';

/**
 * Shopping cart page. It OWNS nothing: the cart lives in CartService (the navbar badge reads the same
 * data), the rows only display and emit, and this page tells the service what to do. After every
 * change the service reloads the cart, so the page just redraws.
 *
 * Bonus: coupon: PUT /api/v2/cart/applyCoupon { couponName }.
 */
@Component({
  imports: [RouterLink, EmptyStateComponent, CartItemComponent, CartSummaryComponent],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  protected readonly auth = inject(AuthService);
  protected readonly cartService = inject(CartService);

  /** The same GET /cart resource the navbar badge uses: no second request for this page. */
  protected readonly cart = this.cartService.cart;

  /** The cart to show, or undefined when there is nothing to show (not loaded yet, or no rows). */
  protected readonly cartData = computed(() => {
    const data = this.cart.value()?.data;
    return data && data.products.length > 0 ? data : undefined;
  });

  protected onQuantityChange(productId: string, count: number): void {
    console.log('[cart page] update', productId, '→ count', count);
    this.cartService.updateQuantity(productId, count).subscribe({
      next: (reply) => {
        console.log('[cart page] reply: total price', reply.data.totalCartPrice);
      },
      error: () => {}, // the error interceptor already showed the toast
      complete: () => {},
    });
  }

  protected onRemove(productId: string): void {
    console.log('[cart page] remove', productId);
    this.cartService.removeItem(productId).subscribe({
      next: (reply) => {
        console.log('[cart page] reply: rows left', reply.data.products.length);
      },
      error: () => {},
      complete: () => {},
    });
  }

  protected onClear(): void {
    console.log('[cart page] clear all');
    this.cartService.clearCart().subscribe({
      next: () => {
        console.log('[cart page] cart cleared');
      },
      error: () => {},
      complete: () => {},
    });
  }
}
