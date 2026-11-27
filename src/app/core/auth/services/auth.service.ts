import { computed, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthResponse, SignInPayload, SignUpPayload } from '../../../features/auth/models/auth.interface';

const TOKEN_KEY = 'userToken';
const NAME_KEY = 'userName';

/**
 * Owns the logged-in state.
 *
 * - The token and name live in Web Storage (survives refresh) AND in a signal (so the UI reacts).
 * - "Keep me signed in" checked → localStorage (survives closing the browser);
 *   unchecked → sessionStorage (gone when the tab closes).
 * - Only call saveSession / signOut to change it; everyone else just reads `token` / `userName` / `isLoggedIn`.
 * - URLs are relative: the base-url interceptor adds https://ecommerce.routemisr.com/api/v1.
 */
@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);
  // The server has no localStorage, so only read it in the browser.
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly token = signal<string | undefined>(this.read(TOKEN_KEY));
  /** Shown in the navbar ("Hi, Ahmed"). */
  readonly userName = signal<string | undefined>(this.read(NAME_KEY));
  readonly isLoggedIn = computed(() => this.token() !== undefined);

  signUp(payload: SignUpPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/signup', payload);
  }

  signIn(payload: SignInPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/signin', payload);
  }

  /** Call after a successful sign in (and after reset / change password — they return a NEW token). */
  saveSession(token: string, userName: string, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(NAME_KEY, userName);
    this.token.set(token);
    this.userName.set(userName);
  }

  /**
   * Replace the token and / or the name after "change password" (a NEW token) or "update profile" (a new name).
   * It writes to the SAME storage the user picked at login: if the token is in localStorage, it stays there.
   */
  updateSession(changes: { readonly token?: string; readonly userName?: string }): void {
    // storage store in the box of localstorage or sessiosn storage
    const storage = (localStorage.getItem(TOKEN_KEY) !== null) ? localStorage : sessionStorage;

    if (changes.token !== undefined) {
      storage.setItem(TOKEN_KEY, changes.token);
      this.token.set(changes.token);
    }
    if (changes.userName !== undefined) {
      storage.setItem(NAME_KEY, changes.userName);
      this.userName.set(changes.userName);
    }
  }

  private read(key: string): string | undefined {
    return this.isBrowser ? (localStorage.getItem(key) ?? sessionStorage.getItem(key) ?? undefined) : undefined;
  }

  signOut(): void {
    // Logging out makes no request, so there is nothing to wait for.
    // We show the spinner for a short moment (a timer) so the user sees something happen.
    this.spinner.show();

    setTimeout(() => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(NAME_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(NAME_KEY);
      this.token.set(undefined);
      this.userName.set(undefined);
      // No cart / wishlist reset here: their resources follow `token`, so they empty themselves.
      this.router.navigate(['/login']);
      this.spinner.hide();
    }, 800);
  }

  // TODO(auth-verify): verifyToken() → GET /auth/verifyToken  (gives decoded.id for the orders page)
}
