import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { tap } from 'rxjs';

/**
 * LEARNING TOOL (dev mode only): prints every API reply in the browser console, in the order it happens,
 * so you can see the real JSON shape of each endpoint before you write its interface.
 *
 * Open DevTools → Console and filter by "[api]". Delete this file (and its line in app.config.ts) when you no longer need it.
 */
export const debugLogInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isDevMode()) {
    return next(req);
  }

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log(`[api] ${req.method} ${req.url} → ${event.status}`, event.body);
        }
      },
      error: (error: unknown) => console.log(`[api] ${req.method} ${req.url} → FAILED`, error),
    }),
  );
};
