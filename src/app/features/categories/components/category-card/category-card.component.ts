import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../../core/models/category.interface';

/** One category on the categories page: big square image + name. Clicking it opens /categories/:id. */
@Component({
  imports: [RouterLink],
  selector: 'app-category-card',
  styleUrl: './category-card.component.css',
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  readonly category = input.required<Category>();
}
