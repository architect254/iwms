import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { AccountsService } from './accounts.service';
import { Account } from './model';

export const accountsResolver: ResolveFn<Account[]> = () => {
  const accountsService = inject(AccountsService);
  return accountsService.getAccounts();
};
