import { Component } from '@angular/core';

/**
 * 🎯 TODO(profile) — My account
 *
 * Objective
 *   A logged-in user manages their account. (The demo links to /profile and /profile/orders but they are behind login, so their design was not inspected — design it in the same style.)
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Sections: update my data, change password, link to "My orders".
 *
 * Done when
 *   - Update name / email / phone.
 *   - Change password: wrong current password shows the API message; the NEW token is saved.
 *   - Link to /profile/orders.
 *
 * Endpoints
 *   - PUT /users/updateMe
 *   - PUT /users/changeMyPassword (returns a new token)
 *
 * Concepts you'll practice
 *   - Two forms on one page
 *   - Nested components: components/change-password-form, components/update-profile-form
 *
 * Do first: TODO(profile-1), TODO(profile-2) in ProfileService
 *
 * Stuck? ask "hint for TODO(profile)" · done? ask "review TODO(profile)".
 */
@Component({
  imports: [],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
