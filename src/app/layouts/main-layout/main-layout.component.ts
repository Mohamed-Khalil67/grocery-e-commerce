import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../../features/cart/services/cart.service';

/**
 * The ONE layout of the app (like the demo): login, sign-up and 404 live inside it too.
 * header-layout → page → footer-layout.
 */
@Component({
  imports: [RouterOutlet, HeaderLayoutComponent, FooterLayoutComponent],
  selector: 'app-main-layout',
  styleUrl: './main-layout.component.css',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  private readonly auth = inject(AuthService);
  private readonly cart = inject(CartService);

  constructor() {
    // Runs on app start and again whenever the user logs in or out (isLoggedIn is a signal).
    // Logged in → load the cart so the navbar badge is right. (On the server nobody is logged in: nothing runs.)
    effect(() => {
      if (this.auth.isLoggedIn()) {
        this.cart.getCart().subscribe(); // errors: the error interceptor already shows a toast
      }
    });
    // TODO(wishlist-1): load the wishlist here the same way.
  }
}
