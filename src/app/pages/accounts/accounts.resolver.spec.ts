import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { accountsResolver } from './accounts.resolver';


describe('accountsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => accountsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
