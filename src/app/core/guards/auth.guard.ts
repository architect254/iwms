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
