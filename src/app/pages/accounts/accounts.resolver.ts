import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { AccountsService } from './accounts.service';
import { UserAccount } from '../../core/models/entities';

export const accountsResolver: ResolveFn<UserAccount[]> = () => {
  const accountsService = inject(AccountsService);
  return accountsService.getAccounts();
};
