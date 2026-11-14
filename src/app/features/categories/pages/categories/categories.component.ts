import {Component, inject, OnInit, signal} from '@angular/core';
import {PageHeaderComponent} from '../../../../shared/ui/page-header/page-header.component';
import {Product} from '../../../../core/models/product.interface';
import {Category} from '../../../../core/models/category.interface';
import {CategoryService} from '../../services/category.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {CategoryCardComponent} from '../../components/category-card/category-card.component';

/**
 * 🎯 TODO(categories) — Categories
 *
 * Objective
 *   A grid of all categories.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Green header "All Categories" / "Browse our wide range of product categories".
 *   - 5 columns of <app-category-card> (large image + name).
 *
 * Done when
 *   - A card opens /categories/:id.
 *
 * Endpoints
 *   - GET /categories
 *
 * Concepts you'll practice
 *   - Card component reuse
 *
 * Do first: TODO(categories-1)
 *
 * Stuck? ask "hint for TODO(categories)" · done? ask "review TODO(categories)".
 */
@Component({
  imports: [
    PageHeaderComponent,
    CategoryCardComponent
  ],
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent{
  private readonly categoryService = inject(CategoryService);

  // rxResource replaces the manual signal, ngOnInit, and .subscribe()
  protected readonly categories = rxResource({
    stream: () => this.categoryService.getCategories(),
  });

}

