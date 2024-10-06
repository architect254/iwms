import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, take } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkUser();

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl(`/auth/sign-in`);
      }
      return isAuthenticated;
    })
  );
};
