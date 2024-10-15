import { TestBed } from '@angular/core/testing';

import { WelfaresService } from './welfares.service';

describe('WelfaresService', () => {
  let service: WelfaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelfaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
