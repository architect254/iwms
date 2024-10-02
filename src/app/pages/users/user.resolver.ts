import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from './user.model';

export const userResolver: ResolveFn<User | null> = (route, state) => {
  return inject(AuthService).currentTokenUserValue$;
};
