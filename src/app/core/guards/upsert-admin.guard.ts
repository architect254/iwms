import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Membership } from '../entities/user.entity';

export const upsertAdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return firstValueFrom(authService.isAdmin);
};
