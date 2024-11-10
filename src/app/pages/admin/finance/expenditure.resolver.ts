import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FinanceService } from './finance.service';
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
  const financesService = inject(FinanceService);

  const welfareId = router.getCurrentNavigation()?.extras.state?.['welfareId'];

  if (welfareId) {
    return membersService.getManyByWelfareId(welfareId);
  } else {
    return membersService.getMany();
  }
};
