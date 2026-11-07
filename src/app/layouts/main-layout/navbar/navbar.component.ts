import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

interface NavLink {
  readonly label: string;
  readonly path: string;
}

interface CategoryLink {
  readonly id: string;
  readonly name: string;
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected readonly auth = inject(AuthService);
  protected readonly cart = inject(CartService);
  protected readonly wishlist = inject(WishlistService);
  private readonly router = inject(Router);

  /** Mobile drawer open/closed. */
  protected readonly menuOpen = signal(false);

  protected readonly links: readonly NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
  ];

  /**
   * Same four categories as the demo's dropdown, with the REAL ids from GET /categories
   * (the demo links them wrongly). TODO(navbar-1): load these from CategoryService instead.
   */
  protected readonly categories: readonly CategoryLink[] = [
    { id: '6439d2d167d9aa4ca970649f', name: 'Electronics' },
    { id: '6439d58a0049ad0b52b9003f', name: "Women's Fashion" },
    { id: '6439d5b90049ad0b52b90048', name: "Men's Fashion" },
    { id: '6439d30b67d9aa4ca97064b1', name: 'Beauty & Health' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Search box → /products?keyword=… (TODO(products) reads the `keyword` query param). */
  protected search(event: Event, keyword: string): void {
    event.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed === '') {
      return;
    }
    this.closeMenu();
    void this.router.navigate(['/products'], { queryParams: { keyword: trimmed } });
  }

  protected signOut(): void {
    this.closeMenu();
    this.auth.signOut();
  }
}
