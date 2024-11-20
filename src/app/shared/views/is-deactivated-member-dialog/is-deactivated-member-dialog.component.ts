import {
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
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Page } from '../../directives/page/page.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../components/form-control/model';
import {
  deactivatedMemberDetailsFormControls,
  DeactivatedMemberDto,
} from './model';
import { MembersService } from '../../../pages/admin/members/members.service';
import { DynamicFormComponent } from '../../components/form-control/form.component';
import { Member } from '../../../core/entities/member.entity';

export const DEACTIVATED_MEMBER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Deactivated member details form controls');

@Component({
  selector: 'adb-is-deactivated-dialog',
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
  ],
  providers: [
    {
      provide: DEACTIVATED_MEMBER_DETAILS_FORM_CONTROLS,
      useFactory: deactivatedMemberDetailsFormControls,
    },
  ],
  templateUrl: './is-deactivated-member-dialog.component.html',
  styleUrl: './is-deactivated-member-dialog.component.scss',
})
export class IsDeactivatedMemberDialogComponent extends Page {
  deactivatedMemberDetailsFormControls = inject(
    DEACTIVATED_MEMBER_DETAILS_FORM_CONTROLS
  );

  deactivatedDto!: DeactivatedMemberDto;

  isSubmitting: Observable<boolean> = of(false);
  canConfirm = false;

  constructor(
    private service: MembersService,
    override dialogRef: MatDialogRef<IsDeactivatedMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public member: Member
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onValidityNotified(data: any) {
    this.deactivatedDto = data;
    this.canConfirm = true;
  }

  confirm() {
    this.isSubmitting = of(true);

    this.subscriptions.add(
      this.service
        .isDeactivated(this.member.id!, this.deactivatedDto)
        .subscribe({
          next: (value) => {
            this.dialogRef.close();
          },
        })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
