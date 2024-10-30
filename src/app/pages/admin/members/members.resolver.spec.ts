import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { membersResolver } from './members.resolver';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';
import { DeactivatedMember } from '../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../core/entities/deceased-member.entity';
import { Member } from '../../../core/entities/member.entity';


describe('usersResolver', () => {
  const executeResolver: ResolveFn<
    (Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
  > = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => membersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
