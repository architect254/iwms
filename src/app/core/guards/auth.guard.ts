import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated$);

  return isAuthenticated;
};
export const noAuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated$);

  return !isAuthenticated;
};
export const roleGuard: CanActivateFn = async (route) => {
  const router = inject(Router);

  const authService = inject(AuthService);

  const account = await firstValueFrom(authService.currentTokenUserValue$);

  const { type, redirectUrl } = route.data['role'];

  if (account?.type == type) {
    return true;
  } else {
    return router.createUrlTree(['/', redirectUrl]);
  }
};
