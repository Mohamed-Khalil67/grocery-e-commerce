import { Component, computed, input, output } from '@angular/core';

/**
 * "− 2 +" control. It does NOT own the number: the parent passes `value` and decides what to do
 * with `changed` (cart-item calls PUT /cart/:id, then the new number comes back down as `value`).
 *
 *   <app-quantity-stepper [value]="line.count" [max]="line.product.quantity" [disabled]="busy" (changed)="update($event)" />
 */
@Component({
  imports: [],
  selector: 'app-quantity-stepper',
  styleUrl: './quantity-stepper.component.css',
  templateUrl: './quantity-stepper.component.html',
})
export class QuantityStepperComponent {
  readonly value = input.required<number>();
  /** Lowest allowed number: 1 in the cart (the trash button removes), 0 on a product card. */
  readonly min = input<number>(0);
  /** Stock limit (for the cart: product.quantity). */
  readonly max = input<number>(99);
  /** True while the parent is waiting for the API. */
  readonly disabled = input<boolean>(false);

  /** Emits the NEW number the user asked for. */
  readonly changed = output<number>();

  protected readonly canDecrease = computed(() => !this.disabled() && this.value() > this.min());
  protected readonly canIncrease = computed(() => !this.disabled() && this.value() < this.max());

  protected decrease(): void {
    if (this.canDecrease()) {
      console.log('[stepper] −', this.value(), '→', this.value() - 1);
      this.changed.emit(this.value() - 1);
    }
  }

  protected increase(): void {
    if (this.canIncrease()) {
      console.log('[stepper] +', this.value(), '→', this.value() + 1, '| max:', this.max());
      this.changed.emit(this.value() + 1);
    }
  }
}
