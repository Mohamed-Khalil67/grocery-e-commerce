import { Component } from '@angular/core';

/**
 * 🎯 TODO(category-details) — Category details
 *
 * Objective
 *   One category, its subcategories and products. (The demo links to /products?category=id; the task asks for a Category Details page.)
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Green header with the category name, <app-subcategory-chips>, products grid.
 *
 * Done when
 *   - Chips filter the grid (bonus).
 *   - Empty state.
 *
 * Endpoints
 *   - GET /categories/:id
 *   - GET /categories/:id/subcategories
 *   - GET /products?category[in]=:id
 *
 * Concepts you'll practice
 *   - computed() for the filtered list
 *
 * Do first: TODO(category-details-1)
 *
 * Stuck? ask "hint for TODO(category-details)" · done? ask "review TODO(category-details)".
 */
@Component({
  imports: [],
  selector: 'app-category-details',
  styleUrl: './category-details.component.css',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent {}
