import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { AdminsService } from './admins.service';
import { Admin } from '../../../core/entities/admin.entity';
import { Membership } from '../../../core/entities/user.entity';

export const adminsResolver: ResolveFn<Admin[]> = () => {
  const adminsService = inject(AdminsService);
  return adminsService.getMany(1, 100, [
    { key: 'membership', value: Membership.Admin },
  ]);
};
