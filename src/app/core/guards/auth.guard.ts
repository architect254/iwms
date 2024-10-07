import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkUser();
  const isAuthenticated = await firstValueFrom(authService.isAuthenticated$);

  if (isAuthenticated) {
    return true;
  } else {
    return router.parseUrl(`/auth/sign-in`);
  }
};
