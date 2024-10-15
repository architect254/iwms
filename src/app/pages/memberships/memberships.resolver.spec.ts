import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { membershipsResolver } from './memberships.resolver';
import { Membership } from './membership';

describe('membershipsResolver', () => {
  const executeResolver: ResolveFn<Membership[] | null> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      membershipsResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
