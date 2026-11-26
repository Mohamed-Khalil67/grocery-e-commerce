import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * "Order Summary" box: subtotal, shipping note, total and the Checkout link. Display only.
 *
 *   <app-cart-summary [itemCount]="count" [total]="data.totalCartPrice" [cartId]="data._id" />
 */
@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-cart-summary',
  styleUrl: './cart-summary.component.css',
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent {
  /** Total quantity (the same number as the navbar badge). */
  readonly itemCount = input.required<number>();
  readonly total = input.required<number>();
  /** Checkout goes to /checkout/:cartId. */
  readonly cartId = input.required<string>();
}
