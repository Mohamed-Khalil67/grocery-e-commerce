import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

// How many requests are running right now.
let pending = 0;

/**
 * Shows the spinner while ANY request is running.
 *
 * Why count? Say two requests start together (products + cart):
 *   request A starts  → pending = 1 → show spinner
 *   request B starts  → pending = 2
 *   request A ends    → pending = 1 → keep the spinner (B is still running)
 *   request B ends    → pending = 0 → hide spinner
 * Without the counter, A ending would hide the spinner while B is still loading.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // HttpClient passes through the interceptors registered in provideHttpClient(withInterceptors([...])).
  // That includes httpResource, which uses HttpClient internally.
  // request starting
  pending++;
  spinner.show().then(() => console.log('spinner visible'));

  // pending is a plain variable at the top of loading.interceptor.ts, outside the function.
  // The interceptor function runs once per request, but the variable is created once and shared by every call.
  // That sharing is what makes it a count of all running requests.
  // finalize runs when the request ends: success, error or cancel
  return next(req).pipe(
    finalize(() => {
      pending--;
      if (pending === 0) {
        spinner.hide().then(() => console.log('finished in'));
      }
    }),
  );
};
