import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { UsersService } from './users.service';
import { Admin } from '../../../core/entities/admin.entity';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';
import { DeactivatedMember } from '../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../core/entities/deceased-member.entity';
import { Member } from '../../../core/entities/member.entity';
import { Membership } from '../../../core/entities/user.entity';

export const usersResolver: ResolveFn<
  (Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
> = () => {
  const usersService = inject(UsersService);
  return usersService.getMany(1, 100, [
    { key: 'membership', value: Membership.Active },
  ]);
};
