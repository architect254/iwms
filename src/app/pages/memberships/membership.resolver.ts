import { ResolveFn } from '@angular/router';

export const membershipResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
