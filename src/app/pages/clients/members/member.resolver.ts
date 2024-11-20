import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';
import { DeactivatedMember } from '../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../core/entities/deceased-member.entity';
import { Member } from '../../../core/entities/member.entity';
import { MembersService } from './members.service';

export const memberResolver: ResolveFn<
  Member | BereavedMember | DeceasedMember | DeactivatedMember
> = (route) => {
  const id = route.paramMap.get('id');
  const membersService = inject(MembersService);
  return membersService.get(id!);
};
