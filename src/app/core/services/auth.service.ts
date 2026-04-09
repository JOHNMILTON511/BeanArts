import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { UserProfile } from '../models/user.model';
import { environment } from '../../../environments/environment';

interface AuthResponse {
  token: string;
  user:  UserProfile;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http       = inject(HttpClient);
  private router     = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private _user = signal<UserProfile | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('ba_user');
      if (stored) this._user.set(JSON.parse(stored));
    }
  }

  get currentUser(): UserProfile | null { return this._user(); }
  get isLoggedIn(): boolean             { return !!this._user(); }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('ba_token');
  }

  // ── Register ────────────────────────────────────────────────────
  async register(email: string, password: string, displayName: string, companyName = ''): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, {
        email, password, displayName, companyName,
      })
    );
    this.storeSession(res);
    await this.router.navigate(['/dashboard']);
  }

  // ── Login ────────────────────────────────────────────────────────
  async login(email: string, password: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password })
    );
    this.storeSession(res);
    await this.router.navigate([res.user.role === 'admin' ? '/admin' : '/dashboard']);
  }

  // ── Forgot Password ─────────────────────────────────────────────
  resetPassword(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

  // ── Logout ──────────────────────────────────────────────────────
  async logout(): Promise<void> {
    this.clearSession();
    await this.router.navigate(['/login']);
  }

  // ── Update cached profile (call after profile save) ─────────────
  updateCachedUser(updated: UserProfile): void {
    this._user.set(updated);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('ba_user', JSON.stringify(updated));
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────
  private storeSession(res: AuthResponse): void {
    this._user.set(res.user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('ba_token', res.token);
      localStorage.setItem('ba_user', JSON.stringify(res.user));
    }
  }

  private clearSession(): void {
    this._user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('ba_token');
      localStorage.removeItem('ba_user');
    }
  }
}
