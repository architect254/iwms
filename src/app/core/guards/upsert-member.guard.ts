import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Membership } from '../entities/user.entity';

export const upsertMemberGuard: CanActivateFn = async (route, state) => {
  return new Promise<boolean>((resolve) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    firstValueFrom(authService.isAdmin).then((isAdmin) => {
      const membership =
        router.getCurrentNavigation()?.extras.state?.['membership'];

      if (isAdmin && membership != Membership.Admin) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
