import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { membershipsResolver } from './memberships.resolver';

describe('membershipsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => membershipsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
