import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContributionsService } from './contributions.service';
import {
  MembershipContribution,
  MonthlyContribution,
  BereavedMemberContribution,
  DeceasedMemberContribution,
  MembershipReactivationContribution,
} from '../../../core/entities/contribution.entity';
import { firstValueFrom } from 'rxjs';

export const contributionResolver: ResolveFn<
  | MembershipContribution
  | MonthlyContribution
  | BereavedMemberContribution
  | DeceasedMemberContribution
  | MembershipReactivationContribution
> = (route) => {
  const id = route.paramMap.get('id');
  const contributionsService = inject(ContributionsService);
  return firstValueFrom(contributionsService.get(id!));
};
