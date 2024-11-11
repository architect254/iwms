import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountUpsertDialogComponent } from './bank-account.component';

describe('BankAccountUpsertDialogComponent', () => {
  let component: BankAccountUpsertDialogComponent;
  let fixture: ComponentFixture<BankAccountUpsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountUpsertDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BankAccountUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
