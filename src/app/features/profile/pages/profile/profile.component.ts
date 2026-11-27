import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { UpdateProfileFormComponent } from '../../components/update-profile-form/update-profile-form.component';

/**
 * My account (route /profile, only for logged-in users: authGuard).
 * A sidebar card (who you are + shortcuts) and the two forms as nested components.
 * Nothing is loaded here: there is no "get my profile" endpoint, the name comes from AuthService.
 */
@Component({
  imports: [RouterLink, PageHeaderComponent, UpdateProfileFormComponent, ChangePasswordFormComponent],
  selector: 'app-profile',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  protected readonly auth = inject(AuthService);

  /** First letter of the name, for the round avatar. */
  protected readonly initial = computed(() => (this.auth.userName() ?? '?').charAt(0).toUpperCase());
}
