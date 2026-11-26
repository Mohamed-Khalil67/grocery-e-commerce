import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuantityStepperComponent } from '../../../../shared/ui/quantity-stepper/quantity-stepper.component';
import { CartLine } from '../../models/cart.interface';

/**
 * One cart row. Display only: it never calls the API, the cart page does.
 *
 *   <app-cart-item [line]="line" (quantityChange)="…($event)" (remove)="…" />
 */
@Component({
  imports: [DecimalPipe, RouterLink, QuantityStepperComponent],
  selector: 'app-cart-item',
  styleUrl: './cart-item.component.css',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  readonly line = input.required<CartLine>();

  /** The NEW quantity the user asked for (never below 1: the trash button removes the row). */
  readonly quantityChange = output<number>();
  readonly remove = output<void>();
}
