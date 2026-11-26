import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { SubcategoryChipsComponent } from '../../components/subcategory-chips/subcategory-chips.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../../shop/services/product.service';

/** Category details: header, subcategory chips (filter) and the category's products. */
@Component({
  imports: [PageHeaderComponent, ProductCardComponent, SubcategoryChipsComponent],
  selector: 'app-category-details',
  styleUrl: './category-details.component.css',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // /categories/:id  → withComponentInputBinding puts the id here
  readonly id = input.required<string>();

  // The three requests all depend on `id`: they run again by themselves when it changes.
  protected readonly category = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.categoryService.getCategory(params),
  });

  private readonly subcategoriesRes = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.categoryService.getSubcategories(params),
  });

  protected readonly products = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.productService.getProducts(1, { 'category[in]': params }),
  });

  // The API can answer with subcategories of OTHER categories → keep only the ones whose parent is this category.
  // computed() = a value calculated from other signals; it recalculates by itself when they change.
  protected readonly subcategories = computed(() => {
    const all = this.subcategoriesRes.value()?.data ?? [];
    return all.filter((sub) => sub.category === this.id());
  });

  // Which chip is selected. undefined = "All". The chips component emits a new value → we .set() it here.
  protected readonly selectedSub = signal<string | undefined>(undefined);

  // The products the grid shows = all products of the category, narrowed by the selected chip.
  // It depends on `products` and `selectedSub`, so clicking a chip updates the grid with no extra code.
  protected readonly visibleProducts = computed(() => {
    const products = this.products.value()?.data ?? [];
    const selected = this.selectedSub();

    if (selected === undefined) {
      return products;                                  // "All" chip: no filtering
    }
    return products.filter((product) =>
      product.subcategory.some((sub) => sub._id === selected),
    );
  });

  /** The card emits the product id. Guests go to /login; the badge updates by itself (CartService `tap`). */
  protected onAddToCart(productId: string): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    console.log('[cart] add →', productId, '| count before:', this.cart.count());
    this.cart.addToCart(productId).subscribe({
      next: (reply) => {
        console.log('[cart] reply →', reply, '| count after:', this.cart.count());
      },
      error: () => {}, // the error interceptor already showed the toast
      complete: () => {},
    });
  }
}
