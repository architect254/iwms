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
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Page } from '../../directives/page/page.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, concatMap, Observable, of } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../components/form-control/model';
import { AuthComponent } from '../auth-dialog/auth-dialog.component';
import { SignUpDto, SignInDto } from '../auth-dialog/auth.dto';
import { passwordsMismatchValidator } from '../auth-dialog/password.validator';
import { bereavedMemberDetailsFormControls } from './model';
import { MembersService } from '../../../pages/admin/members/members.service';
import { DynamicFormComponent } from '../../components/form-control/form.component';
import { Member } from '../../../core/entities/member.entity';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';

export const BEREAVED_MEMBER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Beraved member details form controls');

@Component({
  selector: 'adb-bereaved-dialog',
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
      provide: BEREAVED_MEMBER_DETAILS_FORM_CONTROLS,
      useFactory: bereavedMemberDetailsFormControls,
    },
  ],
  templateUrl: './bereaved-member-dialog.component.html',
  styleUrl: './bereaved-member-dialog.component.scss',
})
export class BereavedMemberDialogComponent extends Page {
  bereavedMemberDetailsFormControls = inject(
    BEREAVED_MEMBER_DETAILS_FORM_CONTROLS
  );

  bereavedDto!: any;

  isSubmitting: Observable<boolean> = of(false);
  canConfirm = false;

  constructor(
    @SkipSelf() authService: AuthService,
    private service: MembersService,
    override dialogRef: MatDialogRef<BereavedMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public member: Member
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onValidityNotified(data: any) {
    this.bereavedDto = data
    console.log('bereaved valid 0', this.bereavedDto, data);
    this.canConfirm = true;
  }

  confirm() {
    this.isSubmitting = of(true);

    console.log('bereaved dto', this.bereavedDto)
    this.subscriptions.add(
      this.service
        .updateToBereaved(this.member.id!, this.bereavedDto)
        .subscribe({
          next: (value) => {
            console.log('bereaved updated', value);
            this.dialogRef.close();
          },
        })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
