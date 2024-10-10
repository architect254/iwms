import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { first, firstValueFrom, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return await firstValueFrom(
    authService.isAuthenticated$.pipe(
      map(async (isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          return new RedirectCommand(router.parseUrl('/auth/sign-in'), {
            state,
            browserUrl: router.getCurrentNavigation()?.finalUrl,
          });
        } else {
          if (state.url.includes('auth')) {
            let nextRoute = '';

            return await firstValueFrom(
              authService.currentTokenUserValue$.pipe(
                map((user) => {
                  if (user?.role == 'Site Admin') {
                    nextRoute = '/users';
                  } else {
                    nextRoute = '/memberships';
                  }
                  return new RedirectCommand(router.parseUrl(nextRoute), {
                    state,
                    browserUrl: router.getCurrentNavigation()?.initialUrl,
                  });
                })
              )
            );
          }
          return true;
        }
      })
    )
  );
};
