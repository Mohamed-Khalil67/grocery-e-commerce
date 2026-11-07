import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * The 3-step forgot-password flow (used by the forgot-password page).
 *
 *   POST /auth/forgotPasswords { email }  ·  POST /auth/verifyResetCode { resetCode }  ·  PUT /auth/resetPassword { email, newPassword }
 */
@Service()
export class PasswordResetService {
  private readonly http = inject(HttpClient);

  // TODO(auth-forgot-1): forgotPassword(email), verifyResetCode(code), resetPassword(email, newPassword) — reset returns a token
}
