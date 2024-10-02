import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userssResolver } from './users.resolver';

describe('userssResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userssResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
