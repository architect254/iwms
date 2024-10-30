import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { Admin } from '../../../core/entities/admin.entity';
import { adminResolver } from './admin.resolver';


describe('adminResolver', () => {
  const executeResolver: ResolveFn<
    Admin
  > = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => adminResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
