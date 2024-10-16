import { ResolveFn } from '@angular/router';

export const accountsResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
