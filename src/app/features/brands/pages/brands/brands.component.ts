import { Component } from '@angular/core';

/**
 * 🎯 TODO(brands) — Brands
 *
 * Objective
 *   A grid of all brands.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - VIOLET <app-page-header theme="violet"> "Top Brands" / "Shop from your favorite brands".
 *   - 6 columns of <app-brand-card>.
 *
 * Done when
 *   - 54 brands → paginate or "load more".
 *   - A card opens /brands/:id.
 *
 * Endpoints
 *   - GET /brands?page=&limit=
 *
 * Concepts you'll practice
 *   - @for + track
 *   - Reusing <app-pagination>
 *
 * Do first: TODO(brands-1)
 *
 * Stuck? ask "hint for TODO(brands)" · done? ask "review TODO(brands)".
 */
@Component({
  imports: [],
  selector: 'app-brands',
  styleUrl: './brands.component.css',
  templateUrl: './brands.component.html',
})
export class BrandsComponent {}
