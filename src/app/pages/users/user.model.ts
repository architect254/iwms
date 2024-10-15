import { Membership } from '../memberships/membership';

export interface BaseEntity {
  id: number;
  create_date: Date;
  update_date: Date;
}
export class BaseEntity implements BaseEntity {}

export enum UserRole {
  SITE_ADMIN = 'Site Admin',
  CLIENT = 'Client',
}
export enum MembershipRole {
  WELFARE_MANAGER = 'Welfare Manager',
  WELFARE_ACCOUNTANT = 'Welfare Accountant',
  WELFARE_SECRETARY = 'Welfare Secretary',
  WELFARE_MEMBER = 'Welfare Member',
}
export interface Child extends BaseEntity {
  first_name: string;
  last_name: string;
  birth_date: string;
}
export interface Spouse extends BaseEntity {
  first_name: string;
  last_name: string;
  id_number: string;
  phone_number: string;
  email: string;
}
export interface User extends BaseEntity {
  first_name: string;
  last_name: string;
  id_number: string;
  birth_date: Date;
  phone_number: string;
  email: string;
  user_role: UserRole;
  profile_image_url: string;
  membership?: Membership;
  spouse?: Spouse;
  children?: Child[];
}

export class Child implements Child {}
export class Spouse implements Spouse {}
export class User implements User {
  first_name!: string;
  last_name!: string;
  id_number!: string;
  birth_date!: Date;
  phone_number!: string;
  email!: string;
  user_role!: UserRole;
  profile_image_url!: string;
  membership?: Membership;
  spouse?: Spouse;
  children?: Child[];
}
