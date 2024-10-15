import { ResolveFn } from '@angular/router';
import { Membership } from './model';

export const membershipsResolver: ResolveFn<Membership[] | null> = (
  route,
  state
) => {
  return null;
};
