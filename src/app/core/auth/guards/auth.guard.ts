import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protects pages that need a token (checkout, profile, orders).
 *
 *   user opens /profile/orders
 *        │
 *   logged in? ── yes ──▶ ✅ true (show the page)
 *        └────── no  ──▶ ⛔ /login
 *
 * Returning a UrlTree (instead of calling router.navigate) lets the router cancel
 * this navigation and start the redirect cleanly.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
