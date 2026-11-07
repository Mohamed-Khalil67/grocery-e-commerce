import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, minLength, pattern, required, submit, validate } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { getApiErrorMessage } from '../../../../core/utils/api-error';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { PasswordStrengthComponent } from '../../components/password-strength/password-strength.component';

@Component({
  imports: [FormField, RouterLink, SocialButtonsComponent, PasswordStrengthComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly model = signal({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    terms: false,
  });

  protected readonly registerForm = form(this.model, (path) => {
    required(path.name, { message: 'Please enter your name' });
    minLength(path.name, 3, { message: 'Name must be at least 3 characters' });

    required(path.email, { message: 'Please enter your email' });
    email(path.email, { message: 'Enter a valid email' });

    required(path.password, { message: 'Please enter your password' });
    // at least 8 characters, one number, one symbol
    pattern(path.password, /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
      message: 'Must be at least 8 characters with numbers and symbols',
    });

    required(path.rePassword, { message: 'Please confirm your password' });
    // valueOf() reads ANOTHER field and re-runs when it changes
    validate(path.rePassword, ({ value, valueOf }) =>
      value() === valueOf(path.password) ? undefined : { kind: 'mismatch', message: 'Passwords do not match' },
    );

    required(path.phone, { message: 'Please enter your phone number' });
    pattern(path.phone, /^01[0125]\d{8}$/, { message: 'Enter a valid Egyptian mobile number' });

    validate(path.terms, ({ value }) =>
      value() ? undefined : { kind: 'terms', message: 'You must accept the terms and conditions' },
    );
  });

  protected readonly apiError = signal('');

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.apiError.set('');

    await submit(this.registerForm, async () => {
      try {
        const { name, email, password, rePassword, phone } = this.model();
        await firstValueFrom(this.auth.signUp({ name, email, password, rePassword, phone }));
        await this.router.navigate(['/login']);
      } catch (error: unknown) {
        this.apiError.set(getApiErrorMessage(error));
      }
    });
  }
}
