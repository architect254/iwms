import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userResolver } from './user.resolver';
import { Admin } from './entities/admin.entity';
import { BereavedMember } from './entities/bereaved-member.entity';
import { DeactivatedMember } from './entities/deactivated-member.entity';
import { DeceasedMember } from './entities/deceased-member.entity';
import { Member } from './entities/member.entity';

describe('userResolver', () => {
  const executeResolver: ResolveFn<
    Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
  > = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => userResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
