import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ToastService } from '../services/toast.service';
import { getApiErrorMessage } from '../utils/api-error';

/**
 * Every failed request ends up here, so this is the ONE place that shows the error to the user:
 *   - turn the error into readable text (getApiErrorMessage) and show it as a toast
 *   - 401 while logged in → the token is expired/invalid → also sign out
 *
 * The error is re-thrown, so a page can still stop what it was doing (e.g. not navigate after a failed login).
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: unknown) => {
      toast.error(getApiErrorMessage(error));
      if (error instanceof HttpErrorResponse && error.status === 401 && auth.isLoggedIn()) {
        auth.signOut();
      }
      return throwError(() => error);
    }),
  );
};
