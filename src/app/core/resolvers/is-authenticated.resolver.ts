import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAuthenticatedResolver: ResolveFn<boolean> = (route, state) => {
  return inject(AuthService).isAuthenticated;
};
