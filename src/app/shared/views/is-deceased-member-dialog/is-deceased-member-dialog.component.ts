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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../components/form-control/model';
import { deceasedMemberDetailsFormControls, DeceasedMemberDto } from './model';
import { MembersService } from '../../../pages/admin/members/members.service';
import { DynamicFormComponent } from '../../components/form-control/form.component';
import { Member } from '../../../core/entities/member.entity';

export const DECEASED_MEMBER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Deceased member details form controls');

@Component({
  selector: 'adb-is-deceased-dialog',
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
      provide: DECEASED_MEMBER_DETAILS_FORM_CONTROLS,
      useFactory: deceasedMemberDetailsFormControls,
    },
  ],
  templateUrl: './is-deceased-member-dialog.component.html',
  styleUrl: './is-deceased-member-dialog.component.scss',
})
export class IsDeceasedMemberDialogComponent extends Page {
  deceasedMemberDetailsFormControls = inject(
    DECEASED_MEMBER_DETAILS_FORM_CONTROLS
  );

  deceasedDto!: DeceasedMemberDto;

  isSubmitting: Observable<boolean> = of(false);
  canConfirm = false;

  constructor(
    private service: MembersService,
    override dialogRef: MatDialogRef<IsDeceasedMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public member: Member
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onValidityNotified(data: any) {
    this.deceasedDto = data;
    this.canConfirm = true;
  }

  confirm() {
    this.isSubmitting = of(true);

    this.subscriptions.add(
      this.service.isDeceased(this.member.id!, this.deceasedDto).subscribe({
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
