import { computed, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, SignInPayload, SignUpPayload } from '../../../features/auth/models/auth.interface';

const TOKEN_KEY = 'userToken';
const NAME_KEY = 'userName';

/**
 * Owns the logged-in state.
 *
 * - The token and name live in localStorage (survives refresh) AND in a signal (so the UI reacts).
 * - Only call saveSession / signOut to change it; everyone else just reads `token` / `userName` / `isLoggedIn`.
 * - URLs are relative: the base-url interceptor adds https://ecommerce.routemisr.com/api/v1.
 */
@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
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
  saveSession(token: string, userName: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(NAME_KEY, userName);
    this.token.set(token);
    this.userName.set(userName);
  }

  private read(key: string): string | undefined {
    return this.isBrowser ? (localStorage.getItem(key) ?? undefined) : undefined;
  }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
    this.token.set(undefined);
    this.userName.set(undefined);
    // TODO(cart-4 / wishlist-3): once those services hold state, reset it here too
    // so the next user doesn't see the previous user's cart badge.
    this.router.navigate(['/login']);
  }

  // TODO(auth-verify): verifyToken() → GET /auth/verifyToken  (gives decoded.id for the orders page)
}
