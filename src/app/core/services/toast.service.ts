import { Service, signal } from '@angular/core';

/** How long a toast stays on screen. The progress bar in <app-toasts> uses the same value. */
export const TOAST_DURATION_MS = 3000;

export type ToastKind = 'success' | 'error';

export interface Toast {
  readonly id: number;
  readonly kind: ToastKind;
  readonly message: string;
}

/**
 * Small pop-up messages. Anything can call `toast.success('Saved')` or `toast.error('Failed')`.
 * <app-toasts> (in app.html) draws the list.
 */
@Service()
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 0;

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  private show(message: string, kind: ToastKind): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, kind, message }]);
    // remove this toast when its time is up
    setTimeout(() => this.dismiss(id), TOAST_DURATION_MS);
  }

  /** Removes one toast (called by the timer and by the X button). */
  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }
}
