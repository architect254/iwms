import { ResolveFn } from '@angular/router';
import { Member } from './model';

export const membersResolver: ResolveFn<Member[] | null> = (
  route,
  state
) => {
  return null;
};
