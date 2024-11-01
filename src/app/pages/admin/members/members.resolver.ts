import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';
import { DeactivatedMember } from '../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../core/entities/deceased-member.entity';
import { Member } from '../../../core/entities/member.entity';
import { MembersService } from './members.service';

export const membersResolver: ResolveFn<
  (Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
> = () => {
  const router = inject(Router);
  const membersService = inject(MembersService);

  const welfareId = router.getCurrentNavigation()?.extras.state?.['welfareId'];

  if (welfareId) {
    return membersService.getManyByWelfareId(welfareId);
  } else {
    return membersService.getMany();
  }
};
