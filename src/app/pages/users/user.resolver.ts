import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UsersService } from './users.service';
import { Admin } from './entities/admin.entity';
import { BereavedMember } from './entities/bereaved-member.entity';
import { DeactivatedMember } from './entities/deactivated-member.entity';
import { DeceasedMember } from './entities/deceased-member.entity';
import { Member } from './entities/member.entity';

export const userResolver: ResolveFn<
  Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
> = (route) => {
  const id = route.paramMap.get('id');
  const usersService = inject(UsersService);
  return usersService.get(id!);
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