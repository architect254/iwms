import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkUser();
  const isAuthenticated = await firstValueFrom(authService.isAuthenticated$);
  console.log('is auth', isAuthenticated);
  if (!isAuthenticated) {
    return new RedirectCommand(router.parseUrl('/auth/sign-in'), {
      state,
      browserUrl: router.getCurrentNavigation()?.finalUrl,
      skipLocationChange: true,
    });
  } else {
    return true;
  }
};
