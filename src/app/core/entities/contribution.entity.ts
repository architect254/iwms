import { Member } from './member.entity';
import { BaseEntity } from './base.entity';
import { BereavedMember } from './bereaved-member.entity';
import { DeceasedMember } from './deceased-member.entity';
import { Account } from './account.entity';

export enum ContributionType {
  Membership = 'Membership',
  Monthly = 'Monthly',
  BereavedMember = 'Bereaved Member',
  DeceasedMember = 'Deceased Member',
  MembershipReactivation = 'Membership Reactivation',
}

export interface Contribution extends BaseEntity {
  type: ContributionType;
  member: Member;
  amount: number;
  account: Account;
}

export interface MembershipContribution extends Contribution {}

export class MembershipContribution implements MembershipContribution {}

export interface MonthlyContribution extends Contribution {
  for_month: Date;
}
export class MonthlyContribution implements MonthlyContribution {}

export interface BereavedMemberContribution extends Contribution {
  bereavedMember: BereavedMember;
}

export class BereavedMemberContribution implements BereavedMemberContribution {}

export interface DeceasedMemberContribution extends Contribution {
  deceasedMember: DeceasedMember;
}
export class DeceasedMemberContribution implements DeceasedMemberContribution {}

export interface MembershipReactivationContribution extends Contribution {}
export class MembershipReactivationContribution
  implements MembershipReactivationContribution {}
