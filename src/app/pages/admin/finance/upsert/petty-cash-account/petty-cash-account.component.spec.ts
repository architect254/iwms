import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashAccountUpsertDialogComponent } from './petty-cash-account.component';

describe('PettyCashAccountUpsertDialogComponent', () => {
  let component: PettyCashAccountUpsertDialogComponent;
  let fixture: ComponentFixture<PettyCashAccountUpsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PettyCashAccountUpsertDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PettyCashAccountUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
