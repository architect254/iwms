import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { adminsResolver } from './admins.resolver';
import { Admin } from '../../../core/entities/admin.entity';

describe('adminsResolver', () => {
  const executeResolver: ResolveFn<
    (Admin)[]
  > = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => adminsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
