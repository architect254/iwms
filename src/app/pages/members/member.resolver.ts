import { ResolveFn } from '@angular/router';
import { MembersService } from './members.service';
import { inject } from '@angular/core';
import { Member } from './model';

export const memberResolver: ResolveFn<Member> = (route, state) => {
  const id = route.paramMap.get('id');
  const membersService = inject(MembersService);
  return membersService.getMemberById(id!);
};
