import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { UsersService } from './users.service';
import { Admin } from './entities/admin.entity';
import { Member } from './entities/member.entity';
import { BereavedMember } from './entities/bereaved-member.entity';
import { DeceasedMember } from './entities/deceased-member.entity';
import { DeactivatedMember } from './entities/deactivated-member.entity';

export const usersResolver: ResolveFn<
  (Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
> = () => {
  const usersService = inject(UsersService);
  return usersService.getMany('all');
};
