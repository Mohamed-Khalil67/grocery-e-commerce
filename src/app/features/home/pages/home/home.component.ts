import { Component } from '@angular/core';

/**
 * 🎯 TODO(home) — Homepage
 *
 * Objective
 *   The landing page — same sections, in the same order, as the demo.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - 1. Hero slider (components/hero-slider)
 *   - 2. Feature strip — already in the layout
 *   - 3. "Shop By Category" round images (components/category-slider)
 *   - 4. Two promo banners (components/promo-banners)
 *   - 5. "Featured Products" 5-column grid (components/featured-products)
 *   - 6. Newsletter + app card (components/newsletter-section)
 *
 * Done when
 *   - Every section above renders with real data where an API exists (categories, products).
 *   - Add to cart / wishlist on the cards works.
 *   - Skeletons while loading, a message if a request fails.
 *
 * Endpoints
 *   - GET /categories
 *   - GET /products
 *
 * Concepts you'll practice
 *   - httpResource() or service call — pick one and know why
 *   - @defer (on viewport) for the products grid
 *   - Child components under components/
 *
 * Do first: TODO(products-1), TODO(categories-1), TODO(cart-1), TODO(wishlist-1)
 *
 * Stuck? ask "hint for TODO(home)" · done? ask "review TODO(home)".
 */
@Component({
  imports: [],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
