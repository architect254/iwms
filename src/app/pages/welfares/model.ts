import { Member } from '../members/model';
import { BaseEntity } from '../accounts/model';

export interface Welfare extends BaseEntity {
  name: string;
  phone_number: string;
  email: string;
  logo_url?: string;
  members: Member[];
}

export class Welfare implements Welfare {}
