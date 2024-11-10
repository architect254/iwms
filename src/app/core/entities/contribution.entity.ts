import { Member } from './member.entity';
import { BaseEntity } from './base.entity';
import { BereavedMember } from './bereaved-member.entity';
import { DeceasedMember } from './deceased-member.entity';
import { Transaction } from './transaction.entity';

export enum ContributionType {
  Membership = 'Membership',
  Monthly = 'Monthly',
  BereavedMember = 'Bereaved Member',
  DeceasedMember = 'Deceased Member',
  MembershipReactivation = 'Membership Reactivation',
}

export interface Contribution extends BaseEntity {
  type: ContributionType;
  transaction: Transaction;
  from: Member | BereavedMember;
  to?: BereavedMember | DeceasedMember;
}

export interface MembershipContribution extends Contribution {}
export class MembershipContribution implements MembershipContribution {
  type: ContributionType = ContributionType.Membership;
}

export interface MonthlyContribution extends Contribution {
  monthly: Date;
}
export class MonthlyContribution implements MonthlyContribution {
  type: ContributionType = ContributionType.Monthly;
}

export interface BereavedMemberContribution extends Contribution {}
export class BereavedMemberContribution implements BereavedMemberContribution {
  type: ContributionType = ContributionType.BereavedMember;
}

export interface DeceasedMemberContribution extends Contribution {}
export class DeceasedMemberContribution implements DeceasedMemberContribution {
  type: ContributionType = ContributionType.DeceasedMember;
}

export interface MembershipReactivationContribution extends Contribution {}
export class MembershipReactivationContribution
  implements MembershipReactivationContribution
{
  type: ContributionType = ContributionType.MembershipReactivation;
}
