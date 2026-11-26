import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.interface';

/**
 * One wishlist row. Display only: it never calls the API, the wishlist page does.
 *
 *   <app-wishlist-item [product]="product" (remove)="…" (addToCart)="…" />
 */
@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-wishlist-item',
  styleUrl: './wishlist-item.component.css',
  templateUrl: './wishlist-item.component.html',
})
export class WishlistItemComponent {
  readonly product = input.required<Product>();

  readonly remove = output<void>();
  readonly addToCart = output<void>();
}
