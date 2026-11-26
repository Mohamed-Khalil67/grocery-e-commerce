import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { CartService } from '../../services/cart.service';

/**
 * Shopping cart page. It OWNS the list: the rows only display and emit, this page calls the API.
 * After every change it reloads the cart (GET /cart), because the PUT / DELETE replies miss the stock.
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

  // GET /cart. `params` is the token: a guest has none (undefined), so the request does not run at all.
  // when a user log in the resource get activated if not guest is there show empty
  protected readonly cart = rxResource({
    params: () => this.auth.token(),
    stream: () => this.cartService.getCart(),
  });

  /** The cart to show, or undefined when there is nothing to show (not loaded yet, or no rows). */
  // here the computed depend on the value of cart that is updated
  protected readonly cartData = computed(() => {
    const data = this.cart.value()?.data;
    return (data && data.products.length > 0 ) ? data : undefined;
  });

  protected onQuantityChange(productId: string, count: number): void {
    console.log('[cart page] update', productId, '→ count', count);
    this.cartService.updateQuantity(productId, count).subscribe({
      next: (reply) => {
        console.log('[cart page] reply: total price', reply.data.totalCartPrice);
        // The PUT reply has no stock (`quantity`) in its products, so we load the full cart again.
        this.cart.reload();
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
        this.cart.reload();
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
        this.cart.set(undefined); // nothing to show → the empty state appears
      },
      error: () => {},
      complete: () => {},
    });
  }
}
