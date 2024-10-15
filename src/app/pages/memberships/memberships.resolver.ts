import { ResolveFn } from '@angular/router';
import { Membership } from './membership';

export const membershipsResolver: ResolveFn<Membership[] | null> = (
  route,
  state
) => {
  return null;
};
