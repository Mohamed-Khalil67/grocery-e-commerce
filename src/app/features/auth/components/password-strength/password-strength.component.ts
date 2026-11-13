import { Component, computed, input } from '@angular/core';

/** The coloured bar + "Weak / Fair / Good / Strong" under the register password field. */
@Component({
  selector: 'app-password-strength',
  styleUrl: './password-strength.component.css',
  templateUrl: './password-strength.component.html',
})
export class PasswordStrengthComponent {
  readonly password = input.required<string>();

  /** 0–4: one point each for length ≥ 8, a digit, an uppercase letter, a symbol. */
  protected readonly score = computed(() => {
    const value = this.password();
    const checks = [value.length >= 8, /\d/.test(value), /[A-Z]/.test(value), /[^A-Za-z0-9]/.test(value)];
    return checks.filter(Boolean).length;
  });

  protected readonly labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  protected readonly colors = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-600'];
}
