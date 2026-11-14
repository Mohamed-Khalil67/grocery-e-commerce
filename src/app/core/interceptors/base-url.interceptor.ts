import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Lets services write `this.http.get('/products')` instead of repeating the full API URL.
 *
 *   http.get('/products')  →  https://ecommerce.routemisr.com/api/v1/products
 *
 * Only changes requests made in code with HttpClient (not what a user types in the address bar).
 * It runs first in the interceptor list, so the others see the full URL.
 * The API address lives only in environment.ts.
 *
 * Kept simple: every call in this app goes to the Route API with a short path.
 * The day you need a full URL (API v2, another site), add a `req.url.startsWith('/')` check here.
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ url: `${environment.apiUrl}${req.url}` }));
};
