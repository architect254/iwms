import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { Admin } from '../../../core/entities/admin.entity';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';
import { DeactivatedMember } from '../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../core/entities/deceased-member.entity';
import { Member } from '../../../core/entities/member.entity';
import { userResolver } from './user.resolver';


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
