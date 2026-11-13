import { Component } from '@angular/core';

/**
 * 🎯 TODO(brand-details) — Brand details
 *
 * Objective
 *   One brand and its products. (The demo has no such page — its brand cards link to /products?brand=id. The task asks for a Brand Details page, so build it.)
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Violet header with the brand logo + name, then a grid of its products.
 *
 * Done when
 *   - Header + products grid with <app-product-card>.
 *   - Empty state when the brand has no products.
 *
 * Endpoints
 *   - GET /brands/:id
 *   - GET /products?brand=:id
 *
 * Concepts you'll practice
 *   - Two requests from one route param
 *
 * Do first: TODO(brand-details-1)
 *
 * Stuck? ask "hint for TODO(brand-details)" · done? ask "review TODO(brand-details)".
 */
@Component({
  imports: [],
  selector: 'app-brand-details',
  styleUrl: './brand-details.component.css',
  templateUrl: './brand-details.component.html',
})
export class BrandDetailsComponent {}
