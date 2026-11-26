import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { FooterLayoutComponent } from '../footer-layout/footer-layout.component';

/**
 * The ONE layout of the app (like the demo): login, sign-up and 404 live inside it too.
 * header-layout → page → footer-layout.
 *
 * It does not load the cart or the wishlist: CartService and WishlistService do that themselves
 * (their resources follow the login token).
 */
@Component({
  imports: [RouterOutlet, HeaderLayoutComponent, FooterLayoutComponent],
  selector: 'app-main-layout',
  styleUrl: './main-layout.component.css',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
