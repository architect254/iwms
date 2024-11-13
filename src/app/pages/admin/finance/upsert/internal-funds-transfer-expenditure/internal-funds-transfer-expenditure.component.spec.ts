import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalFundsTransferExpenditureUpsertDialogComponent } from './internal-funds-transfer-expenditure.component';

describe('InternalFundsTransferExpenditureUpsertDialogComponent', () => {
  let component: InternalFundsTransferExpenditureUpsertDialogComponent;
  let fixture: ComponentFixture<InternalFundsTransferExpenditureUpsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalFundsTransferExpenditureUpsertDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalFundsTransferExpenditureUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
