import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  readonly label: string;
  readonly path: string;
}

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.component.css',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();

  protected readonly shop: readonly FooterLink[] = [
    { label: 'All Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'Brands', path: '/brands' },
    { label: 'Electronics', path: '/categories/6439d2d167d9aa4ca970649f' },
    { label: "Men's Fashion", path: '/categories/6439d5b90049ad0b52b90048' },
    { label: "Women's Fashion", path: '/categories/6439d58a0049ad0b52b9003f' },
  ];

  protected readonly account: readonly FooterLink[] = [
    { label: 'My Account', path: '/profile' },
    { label: 'Order History', path: '/profile/orders' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Shopping Cart', path: '/cart' },
    { label: 'Sign In', path: '/login' },
    { label: 'Create Account', path: '/signup' },
  ];

  /** Informational pages the task doesn't ask for — shown as plain text (the demo's links 404 too). */
  protected readonly support: readonly string[] = [
    'Contact Us',
    'Help Center',
    'Shipping Info',
    'Returns & Refunds',
    'Track Order',
  ];
  protected readonly legal: readonly string[] = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

  protected readonly socials: readonly { icon: string; label: string }[] = [
    { icon: 'fa-facebook-f', label: 'Facebook' },
    { icon: 'fa-twitter', label: 'Twitter' },
    { icon: 'fa-instagram', label: 'Instagram' },
    { icon: 'fa-youtube', label: 'YouTube' },
  ];
}
