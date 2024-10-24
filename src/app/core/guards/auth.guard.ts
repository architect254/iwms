import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated);

  return isAuthenticated;
};
export const noAuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated);

  return !isAuthenticated;
};
export const roleGuard: CanActivateFn = async (route) => {
  const router = inject(Router);

  const authService = inject(AuthService);

  const userAccount = await firstValueFrom(authService.currentTokenUserValue);

  const { type, redirectUrl } = route.data?.['role']!;
  console.log(
    'account token',
    userAccount?.type,
    type,
    userAccount?.type == type
  );

  if (true) {
    return true;
  } else {
    return new RedirectCommand(router.createUrlTree(['/', redirectUrl]));
  }
};
