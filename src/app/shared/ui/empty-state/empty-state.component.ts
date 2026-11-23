import { Component, input } from '@angular/core';

/**
 * Gray icon box + title + text. The buttons are passed in by the page (content projection):
 *
 *   <app-empty-state icon="cart-shopping" title="Your cart is empty" message="Start exploring!">
 *     <a routerLink="/products" class="...">Start Shopping</a>
 *   </app-empty-state>
 */
@Component({
  imports: [],
  selector: 'app-empty-state',
  styleUrl: './empty-state.component.css',
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input<string>('');
  /** Font Awesome icon name without the "fa-" prefix, e.g. "heart". */
  readonly icon = input<string>('box-open');
}
