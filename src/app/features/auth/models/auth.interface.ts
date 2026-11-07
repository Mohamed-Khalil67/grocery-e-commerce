/** POST /auth/signin body. */
export interface SignInPayload {
  email: string;
  password: string;
}

/** POST /auth/signup body. */
export interface SignUpPayload extends SignInPayload {
  name: string;
  rePassword: string;
  phone: string;
}

export type UserRole = 'user' | 'admin';

export interface AuthUser {
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
}

/** Response of POST /auth/signin and POST /auth/signup. */
export interface AuthResponse {
  readonly message: string;
  readonly user: AuthUser;
  readonly token: string;
}

/*
 * TODO(auth-models): add types for the other auth endpoints (look at the real JSON in DevTools → Network):
 *   POST /auth/forgotPasswords · POST /auth/verifyResetCode · PUT /auth/resetPassword
 *   PUT /users/changeMyPassword · PUT /users/updateMe · GET /auth/verifyToken → { decoded: { id, name, role } }
 */
