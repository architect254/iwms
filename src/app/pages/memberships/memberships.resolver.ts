import { ResolveFn } from '@angular/router';

export const membershipsResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
