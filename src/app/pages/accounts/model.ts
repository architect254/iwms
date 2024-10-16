import { Member } from '../members/model';

export interface BaseEntity {
  id: number;
  create_date: Date;
  update_date: Date;
}

export class BaseEntity implements BaseEntity {}

export enum AccountStatus {
  Active = 'Active',
  InActive = 'InActive',
}

export enum AccountType {
  Admin = 'Admin',
  Client = 'Client',
}

export interface Child extends BaseEntity {
  first_name: string;
  last_name: string;
  birth_date: string;
}

export class Child implements Child {}

export interface Spouse extends BaseEntity {
  first_name: string;
  last_name: string;
  id_number: string;
  phone_number: string;
  email: string;
}

export class Spouse implements Spouse {}

export interface Account extends BaseEntity {
  first_name: string;
  last_name: string;
  id_number: string;
  birth_date: Date;
  phone_number: string;
  email: string;
  type: AccountType;
  status: AccountStatus;
  profile_image_url: string;
  member?: Member;
  spouse?: Spouse;
  children?: Child[];
}

export class Account implements Account {}
export type AccountApplication = Omit<Account, 'role'>;
