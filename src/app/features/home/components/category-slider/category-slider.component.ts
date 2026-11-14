import { Component, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ApiListResponse } from '../../../../core/models/api-response.interface';
import { Category } from '../../../../core/models/category.interface';
import { SectionTitleComponent } from '../../../../shared/ui/section-title/section-title.component';

/**
 * "Shop By Category": a responsive grid of round category images (like the demo, so it is a grid, not a slider).
 * It loads its own data, so it can be reused on other pages.
 */
@Component({
  imports: [RouterLink, SectionTitleComponent],
  selector: 'app-category-slider',
  styleUrl: './category-slider.component.css',
  templateUrl: './category-slider.component.html',
})
export class CategorySliderComponent {
  // GET /categories (the base-url interceptor adds the API address)
  protected readonly categories = httpResource<ApiListResponse<Category>>(() => '/categories');

  // 10 grey placeholders shown while the request is running
  protected readonly placeholders: readonly number[] = Array.from({ length: 10 }, (_, index) => index);

  constructor() {
    effect(() => {
      console.log('[categories] status:', this.categories.status());
      const res = this.categories.value();
      if (res) {
        console.log('[categories] loaded', res.data.length, '→', res.data.map((category) => category.name).join(', '));
      }
      if (this.categories.error()) {
        console.log('[categories] FAILED →', this.categories.error());
      }
    });
  }
}
