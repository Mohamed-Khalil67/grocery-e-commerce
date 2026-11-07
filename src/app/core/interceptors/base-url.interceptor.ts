import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Lets services write `this.http.get('/products')` instead of repeating the full API URL.
 *
 *   http.get('/products')  →  https://ecommerce.routemisr.com/api/v1/products
 *
 * Important: this only changes requests made in code with HttpClient.
 * It has nothing to do with what a user types in the browser's address bar (that is the router's job).
 *
 * Why `startsWith('/')`:
 * - '/products' is a short path → we add environment.apiUrl in front.
 * - 'https://other-api.com/x' is already a full URL → leave it alone, otherwise we'd build a broken
 *   address like 'https://ecommerce.routemisr.com/api/v1https://other-api.com/x'.
 *
 * Why it's first in the interceptor list: the auth interceptor checks that the URL starts with the
 * API origin, so the full URL must already exist by then.
 *
 * Benefit: the API address lives only in environment.ts — change it there once for dev / production.
 *
 * Need API v2 (e.g. cart v2)? Pass the full absolute URL for that one call.
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    return next(req.clone({ url: `${environment.apiUrl}${req.url}` }));
  }
  return next(req);
};
