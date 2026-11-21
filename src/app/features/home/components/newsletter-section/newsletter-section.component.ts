import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { ToastrService } from 'ngx-toastr';

/** Newsletter card + app card. There is no API for it: "Subscribe" only shows a thank-you message. */
@Component({
  imports: [FormField],
  selector: 'app-newsletter-section',
  styleUrl: './newsletter-section.component.css',
  templateUrl: './newsletter-section.component.html',
})
export class NewsletterSectionComponent {
  private readonly toast = inject(ToastrService);

  protected readonly model = signal({ email: '' });

  protected readonly newsletterForm = form(this.model, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email' });
  });

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.newsletterForm, async () => {
      this.toast.success('Thanks for subscribing!');
      this.model.set({ email: '' });
      this.newsletterForm().reset();
    });
  }
}
