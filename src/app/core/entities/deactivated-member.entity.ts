import { Member } from './member.entity';

export interface DeactivatedMember extends Member {
  deactivation_date: Date;
  reason: string;
}

export class DeactivatedMember implements DeactivatedMember {}
