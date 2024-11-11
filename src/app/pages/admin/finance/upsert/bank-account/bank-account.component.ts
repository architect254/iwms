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
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  AccountType,
  BankAccount,
} from '../../../../../core/entities/account.entity';
import { FinanceService } from '../../finance.service';
import { DynamicFormComponent } from '../../../../../shared/components/form-control/form.component';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../../../../shared/components/form-control/model';
import { AuthService } from '../../../../../core/services/auth.service';
import { Page } from '../../../../../shared/directives/page/page.directive';
import { bankAccountDetailsFormControls, BankAccountDto } from './model';

export const BANK_ACCOUNT_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Bank account details form controls');

@Component({
  selector: 'adb-bank-account-upsert-dialog',
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
      provide: BANK_ACCOUNT_DETAILS_FORM_CONTROLS,
      useFactory: bankAccountDetailsFormControls,
    },
  ],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss',
})
export class BankAccountUpsertDialogComponent extends Page {
  bankAccountDetailsFormControls = inject(BANK_ACCOUNT_DETAILS_FORM_CONTROLS);

  bankAccount: BankAccount;
  bankAccountDto!: BankAccountDto;

  action: 'create' | 'update';
  isSubmitting: Observable<boolean> = of(false);
  canConfirm = false;

  constructor(
    @SkipSelf() authService: AuthService,
    private service: FinanceService,
    override dialogRef: MatDialogRef<BankAccountUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(authService);
    const { action, bankAccount } = data;
    this.action = action;
    this.bankAccount = bankAccount;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onValidityNotified(data: any) {
    data = JSON.parse(data) as BankAccountDto;

    this.bankAccountDto = data;
    this.bankAccountDto.type = AccountType.Bank;
    this.canConfirm = true;
  }

  confirm() {
    this.isSubmitting = of(true);

    let serviceAction;

    if (this.action == 'update') {
      serviceAction = this.service.updateAccount(
        this.bankAccount.id!,
        this.bankAccountDto
      );
    } else {
      serviceAction = this.service.createAccount(this.bankAccountDto);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = of(false);

          // this.router.navigate(['/', 'finances', id]);

          const snackBarRef = this.snackbar.open(
            `Bank Account successfully ${this.action}d. Navigate back to Welfare Finances?`,
            `OK`,
            {
              panelClass: `alert-success`,
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
