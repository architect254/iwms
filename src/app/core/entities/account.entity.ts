import { BaseEntity } from './base.entity';
import { Contribution } from './contribution.entity';
import { Expenditure } from './expenditure.entity';
import { Welfare } from './welfare.entity';

export enum AccountType {
  Bank = 'Bank',
  PettyCash = 'Petty Cash',
}

export interface Account extends BaseEntity {
  type: AccountType;
  name: string;
  base_amount: number;
  current_amount: number;
  welfare: Welfare;
  contributions: Contribution[];
  expenditures: Expenditure[];
}
export class Account implements Account {}

export interface BankAccount extends Account {
  number: string;
}

export class BankAccount implements BankAccount {}

export interface PettyCashAccount extends Account {}

export class PettyCashAccount implements PettyCashAccount {}
