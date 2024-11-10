import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { contributionsResolver } from './expenditure.resolver';
import {
  MembershipContribution,
  MonthlyContribution,
  BereavedMemberContribution,
  DeceasedMemberContribution,
  MembershipReactivationContribution,
} from '../../../core/entities/contribution.entity';

describe('contributionsResolver', () => {
  const executeResolver: ResolveFn<
    (
      | MembershipContribution
      | MonthlyContribution
      | BereavedMemberContribution
      | DeceasedMemberContribution
      | MembershipReactivationContribution
    )[]
  > = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      contributionsResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
