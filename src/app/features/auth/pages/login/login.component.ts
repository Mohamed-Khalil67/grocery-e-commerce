import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';

/**
 * Reference for a Signal Form + API call. Copy this pattern for the other forms.
 *
 * Reactive Forms (social-media)            →  Signal Forms (here)
 *   new FormGroup({ email: new FormControl })  →  model = signal({ email: '' }); form(model, rules)
 *   Validators.required                         →  required(path.email)
 *   [formGroup] + formControlName="email"       →  [formField]="loginForm.email"
 *   form.get('email')?.touched                  →  loginForm.email().touched()
 *   if (form.valid) … markAllAsTouched()        →  submit(form, async () => …)
 */
@Component({
  imports: [FormField, RouterLink, SocialButtonsComponent],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly model = signal({ email: '', password: '', rememberMe: false });

  protected readonly loginForm = form(this.model, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email' });
    required(path.password, { message: 'Password is required' });
  });

  protected readonly showPassword = signal(false);

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.loginForm, async () => {
      try {
        const { email, password, rememberMe } = this.model();
        const res = await firstValueFrom(this.auth.signIn({ email, password }));
        this.auth.saveSession(res.token, res.user.name, rememberMe);
        this.toast.success('Welcome back!');
        await this.router.navigate(['/']);
      } catch {
        // nothing to do: the error interceptor already showed the error as a toast
      }
    });
  }
}
