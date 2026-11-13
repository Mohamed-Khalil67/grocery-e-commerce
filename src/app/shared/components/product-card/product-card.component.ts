import { Component, computed, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.interface';
import { StarRatingComponent } from '../../ui/star-rating/star-rating.component';

/**
 * Presentational ("dumb") card: it only DISPLAYS a product and EMITS clicks.
 * It never calls the API itself — the page that uses it decides what happens.
 * Layout copied from the demo's `#product-card`.
 *
 *   <app-product-card
 *     [product]="p"
 *     [inWishlist]="wishlistIds().includes(p._id)"
 *     (addToCart)="onAddToCart($event)"
 *     (toggleWishlist)="onToggleWishlist($event)"
 *   />
 */
@Component({
  imports: [RouterLink, DecimalPipe, StarRatingComponent],
  selector: 'app-product-card',
  styleUrl: './product-card.component.css',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly inWishlist = input(false);

  /** Emits the product id. */
  readonly addToCart = output<string>();
  /** Emits the product id. */
  readonly toggleWishlist = output<string>();

  /** Percent off, or 0 when the product isn't on sale. */
  protected readonly discountPercent = computed(() => {
    const { price, priceAfterDiscount } = this.product();
    if (priceAfterDiscount === undefined || priceAfterDiscount >= price) {
      return 0;
    }
    return Math.round((1 - priceAfterDiscount / price) * 100);
  });
}
