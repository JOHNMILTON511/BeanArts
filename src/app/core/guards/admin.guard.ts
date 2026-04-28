import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  // SSR has no localStorage — let the client re-evaluate after hydration
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return true;

  const auth   = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn) return router.createUrlTree(['/login']);
  return auth.currentUser?.role === 'admin' ? true : router.createUrlTree(['/dashboard']);
};
