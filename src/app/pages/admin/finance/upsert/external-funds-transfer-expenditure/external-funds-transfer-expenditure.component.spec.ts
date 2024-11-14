import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFundsTransferExpenditureUpsertDialogComponent } from './external-funds-transfer-expenditure.component';

describe('ExternalFundsTransferExpenditureUpsertDialogComponent', () => {
  let component: ExternalFundsTransferExpenditureUpsertDialogComponent;
  let fixture: ComponentFixture<ExternalFundsTransferExpenditureUpsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalFundsTransferExpenditureUpsertDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalFundsTransferExpenditureUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
