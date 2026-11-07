import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { environment } from '../../../environments/environment';

/**
 * https://ecommerce.routemisr.com — matches both /api/v1 and /api/v2 calls.
 *
 * Why we need this (security):
 * An interceptor runs on EVERY HttpClient request, whatever the URL. Without a check, a call like
 *   this.http.get('https://api.some-other-site.com/data')
 * would also get our `token` header, and that site's owner could copy the login token
 * and use it to call the Route API as the user.
 * So we only add the token when the URL starts with our own API origin.
 * (Today the app only calls the Route API, so this has no visible effect — it protects us
 * the day a second API is added.)
 */
const API_ORIGIN = new URL(environment.apiUrl).origin;

/**
 * Adds the user's token to every request going to the Route API.
 *
 * - The Route API expects a raw `token` header (NOT `Authorization: Bearer ...`).
 * - Requests to other hosts never get the token (don't leak it to third parties).
 * - HttpRequest is immutable, so we clone it with the extra header.
 *
 * Runs AFTER baseUrlInterceptor, so req.url is already absolute here.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  if (token === undefined || !req.url.startsWith(API_ORIGIN)) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { token } }));
};
