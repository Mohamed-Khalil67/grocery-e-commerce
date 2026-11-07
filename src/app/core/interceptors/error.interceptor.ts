import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

/**
 * Global error handling that every request needs:
 *   401 while logged in → the token is expired/invalid → sign out.
 *
 * Everything else is re-thrown, so each page can still show its own message
 * (use getApiErrorMessage() from core/utils/api-error.ts).
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && auth.isLoggedIn()) {
        auth.signOut();
      }
      return throwError(() => error);
    }),
  );
};
