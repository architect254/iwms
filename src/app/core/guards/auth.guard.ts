import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkUser();

  const isAuthenticated = await firstValueFrom(authService.isAuthenticated$);
  if (!isAuthenticated) {
    return new RedirectCommand(router.parseUrl('/auth/sign-in'));
  } else {
    return true;
  }
};
