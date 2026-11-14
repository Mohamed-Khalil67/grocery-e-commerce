import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, pattern, required, submit, validate } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { decodeToken } from '../../../../core/utils/token';
import { PasswordResetService } from '../../services/password-reset.service';

interface StepItem {
  readonly value: 1 | 2 | 3;
  readonly label: string;
}

/**
 * Forgot password: 3 steps in one page. A `step` signal says which form is shown (1, 2 or 3).
 *
 *   1. email        → POST /auth/forgotPasswords   (the API emails a 6-digit code)
 *   2. code         → POST /auth/verifyResetCode
 *   3. new password → PUT  /auth/resetPassword     (returns a token: the user is logged in and sent home)
 *
 * The circles at the top go back to an earlier step; steps you have not reached yet are disabled.
 */
@Component({
  imports: [FormField, RouterLink],
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.component.css',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private readonly reset = inject(PasswordResetService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  // Which step is shown: 1 = email, 2 = code, 3 = new password.
  protected readonly step = signal<1 | 2 | 3>(1);

  // The circles at the top.
  protected readonly steps: readonly StepItem[] = [
    { value: 1, label: 'Email' },
    { value: 2, label: 'Code' },
    { value: 3, label: 'Password' },
  ];

  // One small form per step. They live here (not in the template), so what you typed is still there when you go back.
  protected readonly emailModel = signal({ email: '' });
  protected readonly emailForm = form(this.emailModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email' });
  });

  protected readonly codeModel = signal({ code: '' });
  protected readonly codeForm = form(this.codeModel, (path) => {
    required(path.code, { message: 'Enter the code from your email' });
    pattern(path.code, /^\d{6}$/, { message: 'The code has 6 digits' });
  });

  protected readonly passwordModel = signal({ newPassword: '', rePassword: '' });
  protected readonly passwordForm = form(this.passwordModel, (path) => {
    required(path.newPassword, { message: 'Please enter your new password' });
    // same rule as the register page: at least 8 characters, one number, one symbol
    pattern(path.newPassword, /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
      message: 'Must be at least 8 characters with numbers and symbols',
    });
    required(path.rePassword, { message: 'Please confirm your password' });
    validate(path.rePassword, ({ value, valueOf }) =>
      value() === valueOf(path.newPassword) ? undefined : { kind: 'mismatch', message: 'Passwords do not match' },
    );
  });

  protected async sendCode(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.emailForm, async () => {
      try {
        const { email } = this.emailModel();
        const res = await firstValueFrom(this.reset.forgotPassword(email));
        console.log('[forgot] step 1 OK → code sent to', email, '| API says:', res.message ?? res.statusMsg);
        this.toast.success('Reset code sent to your email');
        this.step.set(2);
      } catch {
        // nothing to do: the error interceptor already showed the error as a toast
      }
    });
  }

  protected async verifyCode(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.codeForm, async () => {
      try {
        const res = await firstValueFrom(this.reset.verifyResetCode(this.codeModel().code));
        console.log('[forgot] step 2 OK → code accepted | API says:', res.status ?? res.statusMsg);
        this.step.set(3);
      } catch {
        // nothing to do: the error interceptor already showed the error as a toast
      }
    });
  }

  protected async resetPassword(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.passwordForm, async () => {
      try {
        const res = await firstValueFrom(this.reset.resetPassword(this.emailModel().email, this.passwordModel().newPassword));
        const payload = decodeToken(res.token);
        console.log('[forgot] step 3 OK → new token received. what is inside it:', payload);
        // the API logs the user in: the response is a new token
        this.auth.saveSession(res.token, payload.name, true);
        this.toast.success('Password changed. Welcome back!');
        await this.router.navigate(['/']);
      } catch {
        // nothing to do: the error interceptor already showed the error as a toast
      }
    });
  }
}
