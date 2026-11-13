import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';

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
  // TODO(cart-3 / wishlist-1): when logged in, load the cart + wishlist once here
  //   so the navbar badges are correct after a page refresh.
}
