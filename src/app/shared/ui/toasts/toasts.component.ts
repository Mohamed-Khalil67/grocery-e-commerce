import { Component, inject } from '@angular/core';
import { TOAST_DURATION_MS, ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toasts',
  styleUrl: './toasts.component.css',
  templateUrl: './toasts.component.html',
})
export class ToastsComponent {
  protected readonly toastService = inject(ToastService);
  protected readonly duration = TOAST_DURATION_MS;
}
