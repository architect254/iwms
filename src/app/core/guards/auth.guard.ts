import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  RedirectCommand,
  Router,
} from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = async (route, seg) => {
  const authService = inject(AuthService);

  return firstValueFrom(authService.isAuthenticated);
};
