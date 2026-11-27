import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, pattern, required, validate } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';

/**
 * Current / new / confirm password → PUT /users/changeMyPassword.
 * The reply holds a NEW token (the old one stops working), so we save it right away.
 * The API checks the rest (wrong current password, weak new password) and the error interceptor shows its message.
 */
@Component({
  imports: [FormField, FormRoot],
  selector: 'app-change-password-form',
  styleUrl: './change-password-form.component.css',
  templateUrl: './change-password-form.component.html',
})
export class ChangePasswordFormComponent {
  private readonly auth = inject(AuthService);
  private readonly profile = inject(ProfileService);
  private readonly toast = inject(ToastrService);

  // the form's data: one signal with the three fields
  protected readonly model = signal({ currentPassword: '', password: '', rePassword: '' });

  // the rules for each field + what to do on submit
  protected readonly passwordForm = form(
    this.model,
    (path) => {
      required(path.currentPassword, { message: 'Please enter your current password' });
      required(path.password, { message: 'Please enter your new password' });
      pattern(path.password, /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {
        message: 'Min 6 characters with a capital letter, a number and a symbol',
      });
      required(path.rePassword, { message: 'Please confirm your new password' });

      // valueOf() reads ANOTHER field, so this re-runs when the new password changes
      validate(path.rePassword, ({ value, valueOf }) =>
        value() === valueOf(path.password) ? undefined : { kind: 'mismatch', message: 'Passwords do not match' },
      );
    },
    {
      // [formRoot] calls this only if every rule passes (after marking all fields as touched)
      submission: {
        action: async (field) => {
          try {
            const res = await firstValueFrom(this.profile.changePassword(this.model()));

            this.auth.updateSession({ token: res.token }); // the old token is dead: keep the NEW one
            this.toast.success('Your password was changed');

            field().reset({ currentPassword: '', password: '', rePassword: '' }); // empty the fields AND forget "touched"
          } catch {
            // nothing to do: the error interceptor already showed the error as a toast
          }
        },
      },
    },
  );
}
