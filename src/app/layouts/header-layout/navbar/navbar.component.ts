import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { CategoryService } from '../../../features/categories/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';

interface NavLink {
  readonly label: string;
  readonly path: string;
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected readonly auth = inject(AuthService);
  protected readonly cart = inject(CartService);
  protected readonly wishlist = inject(WishlistService);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);

  /** Mobile drawer open/closed. */
  protected readonly menuOpen = signal(false);

  protected readonly links: readonly NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
  ];

  /** Categories dropdown: GET /categories, loaded once. */
  protected readonly categories = rxResource({
    stream: () => this.categoryService.getCategories(),
  });

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Search box → /products?keyword=… (TODO(products) reads the `keyword` query param). */
  protected search(event: Event, keyword: string): void {
    event.preventDefault();
    this.closeMenu();
    this.router.navigate(['/products'], { queryParams: { keyword } });
  }

  protected signOut(): void {
    this.closeMenu();
    this.auth.signOut();
  }
}
