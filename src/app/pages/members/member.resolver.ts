import { ResolveFn } from '@angular/router';

export const memberResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
