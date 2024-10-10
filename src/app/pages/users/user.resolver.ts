import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from './user.model';
import { UsersService } from './users.service';
import { catchError, firstValueFrom, of, switchMap } from 'rxjs';

export const userResolver: ResolveFn<User | null> = (route, state) => {
  const id = route.paramMap.get('id');
  const usersService = inject(UsersService);
  return usersService.getUserById(id!);
};
