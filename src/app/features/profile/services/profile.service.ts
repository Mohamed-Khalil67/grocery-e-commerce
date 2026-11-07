import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Logged-in user's account calls.
 *
 *   PUT /users/changeMyPassword { currentPassword, password, rePassword } → returns a NEW token
 *   PUT /users/updateMe { name, email, phone }
 */
@Service()
export class ProfileService {
  private readonly http = inject(HttpClient);

  // TODO(profile-1): changePassword(payload) — then AuthService.saveSession(newToken)
  // TODO(profile-2): updateMe(payload)
}
