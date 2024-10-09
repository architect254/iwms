import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { welfareResolver } from './welfare.resolver';

describe('welfareResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => welfareResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
