import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ContributionsService } from './contributions.service';
import {
  MembershipContribution,
  MonthlyContribution,
  BereavedMemberContribution,
  DeceasedMemberContribution,
  MembershipReactivationContribution,
} from '../../../core/entities/contribution.entity';

export const contributionsResolver: ResolveFn<
  (
    | MembershipContribution
    | MonthlyContribution
    | BereavedMemberContribution
    | DeceasedMemberContribution
    | MembershipReactivationContribution
  )[]
> = () => {
  const router = inject(Router);
  const membersService = inject(ContributionsService);

  const welfareId = router.getCurrentNavigation()?.extras.state?.['welfareId'];

  if (welfareId) {
    return membersService.getManyByWelfareId(welfareId);
  } else {
    return membersService.getMany();
  }
};
