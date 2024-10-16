import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { membersResolver } from './members.resolver';
import { Member } from './model';

describe('membersResolver', () => {
  const executeResolver: ResolveFn<Member[] | null> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      membersResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
