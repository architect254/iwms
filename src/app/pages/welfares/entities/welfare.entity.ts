import { BaseEntity } from '../../users/entities/base.entity';
import { Member } from '../../users/entities/member.entity';

export interface Welfare extends BaseEntity {
  name: string;
  email: string;
  phone_number: string;
  logo_url?: string;
  members: Member[];
}

export class Welfare implements Welfare {}