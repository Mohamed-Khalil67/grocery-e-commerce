/** What you send to PUT /users/changeMyPassword. */
export interface ChangePasswordPayload {
  readonly currentPassword: string;
  readonly password: string;
  readonly rePassword: string;
}

/** Reply of PUT /users/changeMyPassword: a NEW token (the old one stops working). Not verified with a login yet. */
export interface ChangePasswordResponse {
  readonly message: string;
  readonly token: string;
}

/** What you send to PUT /users/updateMe. */
export interface UpdateMePayload {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
}

/** Reply of PUT /users/updateMe: we only care that it worked. Not verified with a login yet. */
export interface UpdateMeResponse {
  readonly message: string;
}
