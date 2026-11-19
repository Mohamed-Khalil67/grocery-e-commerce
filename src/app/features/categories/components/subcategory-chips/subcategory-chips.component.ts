import { Component, input, output } from '@angular/core';
import { Subcategory } from '../../../../core/models/category.interface';

/** Chips for a category's subcategories; emits the selected id (or undefined for "All"). */
@Component({
  imports: [],
  selector: 'app-subcategory-chips',
  styleUrl: './subcategory-chips.component.css',
  templateUrl: './subcategory-chips.component.html',
})
export class SubcategoryChipsComponent {
  readonly subcategories = input.required<readonly Subcategory[]>();
  readonly selectedId = input<string | undefined>(undefined);

  readonly selected = output<string | undefined>();
}
