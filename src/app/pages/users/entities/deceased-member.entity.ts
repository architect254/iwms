import { Member } from './member.entity';

export interface DeceasedMember extends Member {
  demise_date: Date;
}

export class DeceasedMember implements DeceasedMember {}
