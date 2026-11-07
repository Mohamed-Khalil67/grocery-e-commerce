import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * The opposite of authGuard: keeps logged-in users away from login / register / forgot-password.
 *
 *   user opens /login
 *        │
 *   logged in? ── yes ──▶ ⛔ UrlTree to / (home)
 *        └────── no  ──▶ ✅ true
 */
export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn() ? router.createUrlTree(['/']) : true;
};
