import { BaseEntity } from './base.entity';
import { Member } from './member.entity';

export interface Welfare extends BaseEntity {
  name: string;
  phone_number: string;
  email: string;
  hostname: string;
  logo_url?: string;
  chairperson: Member;
  treasurer: Member;
  secretary: Member;
  members: Member[];
}

export class Welfare implements Welfare {}