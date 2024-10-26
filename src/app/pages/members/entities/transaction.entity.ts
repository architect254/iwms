import { BaseEntity } from './base.entity';

import { TransactionStatus, TransactionType } from '../../../core/models/enums';

export interface Transaction extends BaseEntity {
  for: string;
  amount: number;
  from: string;
  to: string;
  type: TransactionType;
  status: TransactionStatus;
}

export class Transaction implements Transaction {}
