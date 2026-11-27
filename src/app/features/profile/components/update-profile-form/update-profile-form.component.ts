import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, pattern, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';

/** Name, email, phone → PUT /users/updateMe. The name starts with the current one. */
@Component({
  imports: [FormField],
  selector: 'app-update-profile-form',
  styleUrl: './update-profile-form.component.css',
  templateUrl: './update-profile-form.component.html',
})
export class UpdateProfileFormComponent {
  private readonly auth = inject(AuthService);
  private readonly profile = inject(ProfileService);
  private readonly toast = inject(ToastrService);

  protected readonly model = signal({ name: this.auth.userName() ?? '', email: '', phone: '' });

  protected readonly profileForm = form(this.model, (path) => {
    required(path.name, { message: 'Please enter your name' });
    minLength(path.name, 3, { message: 'Name must be at least 3 characters' });

    required(path.email, { message: 'Please enter your email' });
    email(path.email, { message: 'Enter a valid email' });

    required(path.phone, { message: 'Please enter your phone number' });
    pattern(path.phone, /^01[0125]\d{8}$/, { message: 'Enter a valid Egyptian mobile number' });
  });

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.profileForm, async () => {
      try {
        const res = await firstValueFrom(this.profile.updateMe(this.model()));
        console.log('[profile] updateMe reply →', res);

        this.auth.updateSession({ userName: this.model().name }); // the navbar greeting updates by itself
        this.toast.success('Your details were updated');
      } catch {
        // nothing to do: the error interceptor already showed the error as a toast
      }
    });
  }
}
