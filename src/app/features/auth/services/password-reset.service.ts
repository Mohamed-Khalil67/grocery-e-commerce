import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiStatusResponse, ResetPasswordResponse } from '../models/auth.interface';

/**
 * The 3-step forgot-password flow (used by the forgot-password page).
 *
 *   1. POST /auth/forgotPasswords  { email }                  → the API emails a 6-digit code
 *   2. POST /auth/verifyResetCode  { resetCode }              → checks the code
 *   3. PUT  /auth/resetPassword    { email, newPassword }     → returns a new token (the user is logged in)
 */
@Service()
export class PasswordResetService {
  private readonly http = inject(HttpClient);

  forgotPassword(email: string): Observable<ApiStatusResponse> {
    return this.http.post<ApiStatusResponse>('/auth/forgotPasswords', { email });
  }

  verifyResetCode(resetCode: string): Observable<ApiStatusResponse> {
    return this.http.post<ApiStatusResponse>('/auth/verifyResetCode', { resetCode });
  }

  resetPassword(email: string, newPassword: string): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>('/auth/resetPassword', { email, newPassword });
  }
}
