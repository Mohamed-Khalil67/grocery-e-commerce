import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePasswordPayload, ChangePasswordResponse, UpdateMePayload, UpdateMeResponse } from '../models/profile.interface';

/**
 * Logged-in user's account calls (the auth interceptor adds the token).
 * Reply shapes are from the docs, not verified with a login yet.
 *
 *   PUT /users/changeMyPassword { currentPassword, password, rePassword } → returns a NEW token
 *   PUT /users/updateMe { name, email, phone }
 */
@Service()
export class ProfileService {
  private readonly http = inject(HttpClient);

  /** After this works, save the new token: AuthService.saveSession(reply.token, ...). */
  changePassword(payload: ChangePasswordPayload): Observable<ChangePasswordResponse> {
    return this.http.put<ChangePasswordResponse>('/users/changeMyPassword', payload);
  }

  updateMe(payload: UpdateMePayload): Observable<UpdateMeResponse> {
    return this.http.put<UpdateMeResponse>('/users/updateMe', payload);
  }
}
