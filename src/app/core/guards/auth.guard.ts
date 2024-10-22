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

  const account = await firstValueFrom(authService.currentTokenUserValue);

  const { classification, redirectUrl } = route.data['role'];console.log("account token", account)

  if (account?.class == classification) {
    return true;
  } else {
    return new RedirectCommand(router.createUrlTree(['/', redirectUrl]));
  }
};
