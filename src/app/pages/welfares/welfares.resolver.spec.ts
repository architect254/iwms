import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { welfaresResolver } from './welfares.resolver';
import { Welfare } from './welfare';

describe('welfaresResolver', () => {
  const executeResolver: ResolveFn<Welfare[] | null> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      welfaresResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
