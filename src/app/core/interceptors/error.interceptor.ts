import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';
import { getApiErrorMessage } from '../utils/api-error';

/**
 * Every failed request ends up here, so this is the ONE place that shows the error to the user:
 * turn it into readable text (getApiErrorMessage) and show it as a toast.
 *
 * The error is re-thrown, so a page can still stop what it was doing (e.g. not navigate after a failed login).
 *
 * Kept simple: an expired token (401) is not handled specially yet.
 * When you meet it, sign the user out here (auth.signOut()) when error.status === 401.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && auth.isLoggedIn()) {
        auth.signOut();
      }
      toast.error(getApiErrorMessage(error));
      return throwError(() => error);
    }),
  );
};
