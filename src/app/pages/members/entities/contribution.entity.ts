import { Member } from './member.entity';
import { BaseEntity } from './base.entity';
import { BereavedMember } from './bereaved-member.entity';
import { DeceasedMember } from './deceased-member.entity';
import { Transaction } from './transaction.entity';

export enum ContributionType {
  Activation = 'Activation',
  Monthly = 'Monthly',
  BereavedMember = 'BereavedMember',
  DeceasedMember = 'DeceasedMember',
  ReActivation = 'ReActivation',
}

export interface Contribution extends BaseEntity {
  type: ContributionType;
  transaction: Transaction;
  from: Member | BereavedMember;
  to?: BereavedMember | DeceasedMember;
}

export class Contribution implements Contribution {}
