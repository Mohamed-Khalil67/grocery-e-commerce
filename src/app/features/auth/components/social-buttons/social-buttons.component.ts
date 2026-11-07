import { Component } from '@angular/core';

/**
 * "Continue with Google / Facebook" — buttons only, like the demo (the Route API has no social login).
 * Used by BOTH login and register, so it lives in features/auth/components.
 */
@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
})
export class SocialButtonsComponent {}
