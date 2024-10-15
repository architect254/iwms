import { Membership, MembershipRole } from '../memberships/model';
import { BaseEntity } from '../users/model';

export interface Welfare extends BaseEntity {
  name: string;
  phone_number: string;
  email: string;
  logo_url?: string;
  memberships: Membership[];
}
export class Welfare implements Welfare {}
