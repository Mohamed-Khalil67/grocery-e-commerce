import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

/**
 * Adds the user's token to every request, when there is one.
 *
 * - The Route API expects a raw `token` header (NOT `Authorization: Bearer ...`).
 * - HttpRequest is immutable, so we clone it with the extra header.
 *
 * Kept simple: every request in this app goes to the Route API.
 * The day you call another site with HttpClient, only send the token to your own API
 * (otherwise that site receives the login token).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  return next(token ? req.clone({ setHeaders: { token } }) : req);
};
