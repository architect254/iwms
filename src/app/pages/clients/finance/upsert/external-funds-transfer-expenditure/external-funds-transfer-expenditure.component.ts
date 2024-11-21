import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  SkipSelf,
  inject,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FinanceService } from '../../finance.service';
import { DynamicFormComponent } from '../../../../../shared/components/form-control/form.component';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../../../../shared/components/form-control/model';
import { AuthService } from '../../../../../core/services/auth.service';
import { Page } from '../../../../../shared/directives/page/page.directive';
import {
  externalFundsTransferExpenditureDetailsFormControls,
  ExternalFundsTransferExpenditureDto,
} from './model';
import { externalFundsTransferExpenditureColumns } from '../../list/model';
import {
  ExpenditureType,
  ExternalFundsTransferExpenditure,
} from '../../../../../core/entities/expenditure.entity';

export const EXTERNAL_FUNDS_TRANSFER_EXPENDITURE_DETAILS_FORM_CONTROLS =
  new InjectionToken<Observable<DynamicCustomFormControlBase<ValueType>[]>>(
    'External funds transfer expenditure details form controls'
  );

@Component({
  selector: 'iwms-external-funds-transfer-upsert-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    DynamicFormComponent,
    TitleCasePipe,
  ],
  providers: [
    {
      provide: EXTERNAL_FUNDS_TRANSFER_EXPENDITURE_DETAILS_FORM_CONTROLS,
      useFactory: externalFundsTransferExpenditureDetailsFormControls,
    },
  ],
  templateUrl: './external-funds-transfer-expenditure.component.html',
  styleUrl: './external-funds-transfer-expenditure.component.scss',
})
export class ExternalFundsTransferExpenditureUpsertDialogComponent extends Page {
  externalFundsTransferExpenditureDetailsFormControls = inject(
    EXTERNAL_FUNDS_TRANSFER_EXPENDITURE_DETAILS_FORM_CONTROLS
  );

  externalFundsTransferExpenditure: ExternalFundsTransferExpenditure;
  externalFundsTransferExpenditureDto!: ExternalFundsTransferExpenditureDto;

  action: 'create' | 'update';
  isSubmitting: Observable<boolean> = of(false);
  canConfirm = false;

  constructor(
    private service: FinanceService,
    override dialogRef: MatDialogRef<ExternalFundsTransferExpenditureUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();

    const { action, externalFundsTransferExpenditure } = data;
    this.action = action;
    this.externalFundsTransferExpenditure = externalFundsTransferExpenditure;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onValidityNotified(data: any) {
    data = JSON.parse(data) as ExternalFundsTransferExpenditureDto;

    this.externalFundsTransferExpenditureDto = data;
    this.externalFundsTransferExpenditureDto.type =
      ExpenditureType.ExternalFundsTransfer;
    this.canConfirm = true;
  }

  confirm() {
    this.isSubmitting = of(true);

    let serviceAction;

    if (this.action == 'update') {
      serviceAction = this.service.updateExpenditure(
        this.externalFundsTransferExpenditure.id!,
        this.externalFundsTransferExpenditureDto
      );
    } else {
      serviceAction = this.service.createExpenditure(
        this.externalFundsTransferExpenditureDto
      );
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = of(false);

          // this.router.navigate(['/', 'finances', id]);

          const snackBarRef = this.snackbar.open(
            `Petty Cash Account successfully ${this.action}d. Navigate back to Welfare Finances?`,
            `OK`,
            {
              panelClass: `alert-success`,
              duration: 5000,
            }
          );
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['../']);

            snackBarRef.dismiss();
          });

          this.dialogRef.close();
        },
        error: (err) => {
          this.isSubmitting = of(false);
        },
      })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
