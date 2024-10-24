import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AccountsService } from './accounts.service';
import { UserAccount } from '../../core/models/entities';


export const accountResolver: ResolveFn<UserAccount> = (route) => {
  const id = route.paramMap.get('id');
  const accountsService = inject(AccountsService);
  return accountsService.getAccountById(id!);
};
// export const welfareResolver: ResolveFn<Welfare | undefined> = (
//   route,
//   state
// ) => {
//   const id = route.paramMap.get('id');
//   const accountsService = inject(AccountsService);
//   return accountsService
//     .getAccountById(id!)
//     .pipe(map((account) => account.member?.welfare));
// };
