import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from './model';
import { UsersService } from './users.service';
import { catchError, firstValueFrom, map, of, switchMap } from 'rxjs';
import { Welfare } from '../welfares/model';

export const userResolver: ResolveFn<User> = (route, state) => {
  const id = route.paramMap.get('id');
  const usersService = inject(UsersService);
  return usersService.getUserById(id!);
};
// export const welfareResolver: ResolveFn<Welfare | undefined> = (
//   route,
//   state
// ) => {
//   const id = route.paramMap.get('id');
//   const usersService = inject(UsersService);
//   return usersService
//     .getUserById(id!)
//     .pipe(map((user) => user.membership?.welfare));
// };
