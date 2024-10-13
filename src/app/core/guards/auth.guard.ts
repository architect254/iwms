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
          if (route.url.toString().includes('home')) {
            return true;
          } else {
            return new RedirectCommand(router.parseUrl('/home'));
          }
        } else {
          if (route.url.toString().includes('home')) {
            let nextRoute = '';

            return await firstValueFrom(
              authService.currentTokenUserValue$.pipe(
                map((user) => {
                  if (user?.role == 'Site Admin') {
                    nextRoute = '/users';
                  } else {
                    nextRoute = '/memberships';
                  }
                  return new RedirectCommand(router.parseUrl(nextRoute));
                })
              )
            );
          } else return true;
        }
      })
    )
  );
};
