import { Component } from '@angular/core';

/**
 * 🎯 TODO(auth-forgot) — Forgot password
 *
 * Objective
 *   A user who forgot their password gets a new one without leaving this page.
 *
 * What the demo (https://freshcart-route.vercel.app) looks like
 *   - Two columns inside the store layout: left a soft-green illustration card "Reset Your Password" (+ Email Verification / Secure Reset / Encrypted), right a white card.
 *   - Right card: logo, "Forgot Password?", "No worries, we'll send you a reset code", a 3-step indicator (email → code → new password), then the current step's form.
 *   - Step 1 button "Send Reset Code", links "Back to Sign In" and "Remember your password? Sign In".
 *
 * Done when
 *   - Step 1: email → a 6-digit code is emailed.
 *   - Step 2: code → checked by the API.
 *   - Step 3: new password → user is logged in and sent home.
 *   - Each step shows API errors; the button shows a spinner while loading.
 *
 * Endpoints
 *   - POST /auth/forgotPasswords
 *   - POST /auth/verifyResetCode
 *   - PUT /auth/resetPassword (returns a token)
 *
 * Concepts you'll practice
 *   - Step as a string-literal union signal
 *   - @switch in the template
 *   - One Signal Form per step (copy LoginComponent)
 *
 * Do first: TODO(auth-forgot-1) in PasswordResetService
 *
 * Stuck? ask "hint for TODO(auth-forgot)" · done? ask "review TODO(auth-forgot)".
 */
@Component({
  imports: [],
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.component.css',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {}
