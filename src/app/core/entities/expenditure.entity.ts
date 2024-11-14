import { Account } from './account.entity';
import { BaseEntity } from './base.entity';

export enum ExpenditureType {
  InternalFundsTransfer = 'Internal Funds Transfer',
  ExternalFundsTransfer = 'External Funds Transfer',
}

export interface Expenditure extends BaseEntity {
  type: ExpenditureType;
  from: Account;
  amount: number;
  for: string;
}

export class Expenditure implements Expenditure {}

export interface InternalFundsTransferExpenditure extends Expenditure {
  to: Account;
}

export class InternalFundsTransferExpenditure
  implements InternalFundsTransferExpenditure {}

export interface ExternalFundsTransferExpenditure extends Expenditure {
  toAccount: string;
}

export class ExternalFundsTransferExpenditure
  implements ExternalFundsTransferExpenditure {}
