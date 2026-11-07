import { HttpErrorResponse } from '@angular/common/http';

/**
 * Turns a failed request into text for the user.
 * The Route API answers with { message: '...' } or, for validation, { errors: { msg: '...' } }.
 * Keep it simple: handle those two. Add more cases when you actually hit them.
 */
export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const body: unknown = error.error;
    if (typeof body === 'object' && body !== null) {
      if ('errors' in body && typeof body.errors === 'object' && body.errors !== null && 'msg' in body.errors) {
        return String(body.errors.msg);
      }
      if ('message' in body && typeof body.message === 'string') {
        return body.message;
      }
    }
  }
  return 'Something went wrong. Please try again.';
}
