import { Membership } from '../memberships/membership';
import { BaseEntity } from '../users/user.model';

export interface Welfare extends BaseEntity {
  name: string;
  phone_number: string;
  email: string;
  logo_url?: string;
  memberships: Membership[];
}
export class Welfare implements Welfare {}
