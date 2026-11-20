import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // route params (:id) and query params arrive as component inputs: id = input.required<string>()
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' , anchorScrolling: "enabled"}),
    ),
    provideHttpClient(
      // ORDER MATTERS: base-url first (so the others see the full URL), error last (closest to the response)
      withInterceptors([baseUrlInterceptor, authInterceptor, loadingInterceptor, errorInterceptor]),
    ),
    provideClientHydration(),
    // pop-up messages: close button + progress bar, gone after 3 s
    provideToastr({ timeOut: 3000, closeButton: true, progressBar: true, positionClass: 'toast-top-right' }),
  ],
};
