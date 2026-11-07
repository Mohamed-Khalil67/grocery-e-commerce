import { Component } from '@angular/core';

/**
 * 🎯 TODO(product-details) — Product details
 *
 * Objective
 *   Everything about one product, and a way to buy it.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Crumbs: Home > Category > Subcategory > Title.
 *   - Left components/product-gallery, right components/product-info (badges, title, stars, price, In Stock, quantity, Total Price, Add to Cart green + Buy Now dark, Add to Wishlist).
 *   - Three small info boxes: Free Delivery, 30 Days Return, Secure Payment.
 *   - components/product-tabs (Details · Reviews · Shipping & Returns) with its own child components.
 *   - components/related-products: "You May Also Like".
 *
 * Done when
 *   - Bad id (/products/123 → API 400) shows a friendly message.
 *   - Quantity stepper updates the total.
 *   - Reviews tab lists reviews (bonus: add one).
 *
 * Endpoints
 *   - GET /products/:id
 *   - GET /products/:id/reviews
 *   - POST /products/:id/reviews (bonus)
 *   - GET /products?category[in]= (related)
 *
 * Concepts you'll practice
 *   - Route param as input.required<string>()
 *   - httpResource
 *   - linkedSignal for the selected image
 *   - Two levels of nested components
 *
 * Do first: TODO(product-details-1)
 *
 * Stuck? ask "hint for TODO(product-details)" · done? ask "review TODO(product-details)".
 */
@Component({
  imports: [],
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {}
