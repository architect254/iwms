import { TransactionStatus, TransactionType } from '../models/enums';
import { BaseEntity } from './base.entity';


export interface Transaction extends BaseEntity {
  for: string;
  amount: number;
  from: string;
  to: string;
  type: TransactionType;
  status: TransactionStatus;
}

export class Transaction implements Transaction {}
