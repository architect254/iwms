import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Admin } from '../../../../core/entities/admin.entity';
import { BereavedMember } from '../../../../core/entities/bereaved-member.entity';
import { Child } from '../../../../core/entities/child.entity';
import { DeactivatedMember } from '../../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../../core/entities/deceased-member.entity';
import { Member, Role } from '../../../../core/entities/member.entity';
import { Spouse } from '../../../../core/entities/spouse.entity';
import { Membership } from '../../../../core/entities/user.entity';
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicFormComponent } from '../../../../shared/components/form-control/form.component';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import {
  EditableViewPage,
} from '../../../../shared/directives/view-page/editable-view-page.directive';
import { AdminsService } from '../admins.service';
import { adminUserDetailsFormControls } from './model';
import { Welfare } from '../../../../core/entities/welfare.entity';

export const ADMIN_USER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('admin user details form controls');

@Component({
  selector: 'iwms-upsert',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    DynamicFormComponent,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSnackBarModule,
    JsonPipe,
  ],
  providers: [
    {
      provide: ADMIN_USER_DETAILS_FORM_CONTROLS,
      useFactory: adminUserDetailsFormControls,
    },
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends EditableViewPage {
  admin?: Admin;
  adminId?: string;

  adminUserDetailsFormControls = inject(ADMIN_USER_DETAILS_FORM_CONTROLS);

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: AdminsService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe({
        next: (data: Data) => {
          this.admin = data['admin'];
          this.adminId = this.admin?.id;

          if (this.pageAction == 'update') {
            if (this.admin) {
              this.adminUserDetailsFormControls.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  form.forEach(
                    (control: DynamicCustomFormControlBase<ValueType>) => {
                      if (control) {
                        control.value = (
                          this.admin as unknown as Record<string, ValueType>
                        )?.[control.key] as ValueType;
                      }
                    }
                  );
                }
              );
            }
          }
        },
      })
    );
  }

  onValidityNotified(formData: string) {
    const data = JSON.parse(formData);
    this.admin = { ...data };

    this.isProceedAllowed = true;
  }

  save() {
    this.isSubmitting = true;

    const payload: any = {
      ...this.admin,
    };

    payload['membership'] = Membership.Admin;

    let serviceAction;

    if (this.pageAction == 'update') {
      serviceAction = this.service.update(this.adminId!, payload);
    } else {
      serviceAction = this.service.create(payload);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = false;

          this.router.navigate(['/', 'admins', id]);

          const snackBarRef = this.snackbar.open(
            `Admin successfully ${this.pageAction}d. Navigate back to Admins List?`,
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
        },
        error: (err) => {
          this.isSubmitting = false;
        },
      })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
