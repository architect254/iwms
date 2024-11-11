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
import {
  AccountType,
  BankAccount,
  PettyCashAccount,
} from '../../../../../core/entities/account.entity';
import { FinanceService } from '../../finance.service';
import { DynamicFormComponent } from '../../../../../shared/components/form-control/form.component';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../../../../shared/components/form-control/model';
import { AuthService } from '../../../../../core/services/auth.service';
import { Page } from '../../../../../shared/directives/page/page.directive';
import {
  pettyCashAccountDetailsFormControls,
  PettyCashAccountDto,
} from './model';

export const PETTY_CASH_ACCOUNT_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Petty cash account details form controls');

@Component({
  selector: 'iwms-petty-cash-account-upsert-dialog',
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
      provide: PETTY_CASH_ACCOUNT_DETAILS_FORM_CONTROLS,
      useFactory: pettyCashAccountDetailsFormControls,
    },
  ],
  templateUrl: './petty-cash-account.component.html',
  styleUrl: './petty-cash-account.component.scss',
})
export class PettyCashAccountUpsertDialogComponent extends Page {
  pettyCashAccountDetailsFormControls = inject(
    PETTY_CASH_ACCOUNT_DETAILS_FORM_CONTROLS
  );

  pettyCashAccount: PettyCashAccount;
  pettyCashAccountDto!: PettyCashAccountDto;

  action: 'create' | 'update';
  isSubmitting: Observable<boolean> = of(false);
  canConfirm = false;

  constructor(
    @SkipSelf() authService: AuthService,
    private service: FinanceService,
    override dialogRef: MatDialogRef<PettyCashAccountUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(authService);
    const { action, pettyCashAccount } = data;
    this.action = action;
    this.pettyCashAccount = pettyCashAccount;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onValidityNotified(data: any) {
    data = JSON.parse(data) as PettyCashAccountDto;

    this.pettyCashAccountDto = data;
    this.pettyCashAccountDto.type = AccountType.PettyCash;
    this.canConfirm = true;
  }

  confirm() {
    this.isSubmitting = of(true);

    let serviceAction;

    if (this.action == 'update') {
      serviceAction = this.service.updateAccount(
        this.pettyCashAccount.id!,
        this.pettyCashAccountDto
      );
    } else {
      serviceAction = this.service.createAccount(this.pettyCashAccountDto);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = of(false);

          this.router.navigate(['/', 'finances', id]);

          const snackBarRef = this.snackbar.open(
            `Bank Account successfully ${this.action}d. Navigate back to Welfare Finances?`,
            `OK`,
            {
              panelClass: `alert success`,
              duration: 200,
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
