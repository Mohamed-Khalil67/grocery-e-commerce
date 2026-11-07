import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FeatureStripComponent } from './feature-strip/feature-strip.component';

/**
 * The ONE layout of the app (like the demo): login, sign-up and 404 live inside it too.
 * Top bar + navbar → page → feature strip → footer.
 */
@Component({
  imports: [RouterOutlet, NavbarComponent, FeatureStripComponent, FooterComponent],
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  // TODO(cart-3 / wishlist-1): when logged in, load the cart + wishlist once here
  //   so the navbar badges are correct after a page refresh.
}
