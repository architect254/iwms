import {
  Gender,
  State,
  Role,
  Status,
  ContributionType,
  AccountType,
  TransactionType,
  TransactionStatus,
} from './enums';

export interface BaseEntity {
  id: number;
  create_date: Date;
  update_date: Date;
}

export interface Child extends BaseEntity {
  name: string;
  gender: Gender;
  birth_date: string;
}

export class Child implements Child {}

export interface Spouse extends BaseEntity {
  name: string;
  gender: Gender;
  id_number: string;
  phone_number: string;
  email: string;
}

export class Spouse implements Spouse {}

export interface UserAccount extends BaseEntity {
  type: AccountType;
  state: State;
  name: string;
  gender: Gender;
  id_number: number;
  birth_date: Date;
  phone_number: string;
  profile_image?: string;
}

export interface ClientUserAccount extends UserAccount {
  role: Role;
  status: Status;
  welfare: Welfare;
  from: Contribution[];
  to: Contribution[];
  spouse: Spouse;
  children: Child[];
}

export class ClientUserAccount implements ClientUserAccount {}

export interface AdminUserAccount extends UserAccount {
  email: string;
}

export class AdminUserAccount implements AdminUserAccount {}

export interface Welfare extends BaseEntity {
  name: string;
  phone_number: string;
  email: string;
  logo_url?: string;
  members: ClientUserAccount[];
}

export class Welfare implements Welfare {}

export interface Contribution extends BaseEntity {
  type: ContributionType;
  transaction: Transaction;
  from: ClientUserAccount;
  to: ClientUserAccount;
}

export class Contribution implements Contribution {}

export interface Transaction extends BaseEntity {
  for: string;
  amount: number;
  from: string;
  to: string;
  type: TransactionType;
  status: TransactionStatus;
}

export class Transaction implements Transaction {}
