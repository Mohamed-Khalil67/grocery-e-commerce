import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../../core/models/brand.interface';

/** One brand on the brands page: logo on a light-gray square + name. Clicking it opens /brands/:id. */
@Component({
  imports: [RouterLink],
  selector: 'app-brand-card',
  styleUrl: './brand-card.component.css',
  templateUrl: './brand-card.component.html',
})
export class BrandCardComponent {
  readonly brand = input.required<Brand>();
}
