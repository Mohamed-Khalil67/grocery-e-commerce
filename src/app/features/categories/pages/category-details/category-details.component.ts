import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
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
  protected readonly subcategories = computed(() =>
    (this.subcategoriesRes.value()?.data ?? []).filter((sub) => sub.category === this.id()),
  );

  // Which chip is selected. undefined = "All". The chips component emits a new value → we .set() it here.
  protected readonly selectedSub = signal<string | undefined>(undefined);

  // The products the grid shows = all products of the category, narrowed by the selected chip.
  // It depends on `products` and `selectedSub`, so clicking a chip updates the grid with no extra code.
  protected readonly visibleProducts = computed(() => {
    const products = this.products.value()?.data ?? [];
    const sub = this.selectedSub();
    if (sub === undefined) {
      return products;
    }
    return products.filter((product) => product.subcategory.some((s) => s._id === sub));
  });

  constructor() {
    // DEBUG logs (delete them when you understand the flow).
    // effect() runs again every time a signal it reads changes. Open DevTools > Console to watch.
    effect(() => console.log('1) id from the URL:', this.id()));
    effect(() => console.log('2) category reply:', this.category.value()));
    effect(() =>
      console.log('3) RAW subcategories from the API (may be other categories too):', this.subcategoriesRes.value()?.data),
    );
    effect(() => console.log('4) CLEANED subcategories (sub.category === id):', this.subcategories()));
    effect(() => console.log('5) products of the category:', this.products.value()?.data));
    effect(() => console.log('6) selectedSub (undefined = All):', this.selectedSub()));
    effect(() => console.log('7) visibleProducts shown in the grid:', this.visibleProducts().length));
  }
}
