import { Membership } from '../memberships/membership';

export interface BaseEntity {
  id?: string;
  create_date?: Date;
  update_date?: Date;
}
export class BaseEntity implements BaseEntity {}

export enum UserRole {
  SITE_ADMIN = 'Site Admin',
  WELFARE_MANAGER = 'Welfare Manager',
  WELFARE_ACCOUNTANT = 'Welfare Accountant',
  WELFARE_SECRETARY = 'Welfare Secretary',
  WELFARE_CLIENT_MEMBER = 'Welfare Client Member',
}
export interface User extends BaseEntity {
  first_name?: string;
  last_name?: string;
  id_number?: string;
  phone_number?: string;
  email?: string;
  role?: UserRole;
  profile_image_url?: string;
  membership?: Membership;
}

export class User implements User {}
