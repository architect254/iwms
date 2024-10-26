import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  return new Promise<boolean>((resolve) => {
    const authService = inject(AuthService);

    firstValueFrom(authService.isAuthenticated).then((isAuthenticated) => {
      resolve(isAuthenticated);
    });
  });
};
