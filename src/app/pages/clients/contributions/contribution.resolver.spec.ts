import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { contributionResolver } from './contribution.resolver';
import { MembershipContribution, MonthlyContribution, BereavedMemberContribution, DeceasedMemberContribution, MembershipReactivationContribution } from '../../../core/entities/contribution.entity';



describe('contributionResolver', () => {
  const executeResolver: ResolveFn<
  | MembershipContribution
  | MonthlyContribution
  | BereavedMemberContribution
  | DeceasedMemberContribution
  | MembershipReactivationContribution  > = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => contributionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
