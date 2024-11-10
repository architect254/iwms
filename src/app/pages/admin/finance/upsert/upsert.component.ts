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
import { Welfare } from '../../../../core/entities/welfare.entity';
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicFormComponent } from '../../../../shared/components/form-control/form.component';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomDropdownControl,
} from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { EditableViewPage } from '../../../../shared/directives/view-page/editable-view-page.directive';
import { ContributionsService } from '../finance.service';
import { memberContributionDetailsFormControls } from './model';
import {
  BereavedMemberContribution,
  ContributionType,
  DeceasedMemberContribution,
  MembershipContribution,
  MembershipReactivationContribution,
  MonthlyContribution,
} from '../../../../core/entities/contribution.entity';

export const CONTRIBUTION_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Contribution details form controls');

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
      provide: CONTRIBUTION_DETAILS_FORM_CONTROLS,
      useFactory: memberContributionDetailsFormControls,
    },
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends EditableViewPage {
  contribution?:
    | MembershipContribution
    | MonthlyContribution
    | BereavedMemberContribution
    | DeceasedMemberContribution
    | MembershipReactivationContribution;
  contributionId?: string;
  member?: Member;

  type!: ContributionType;

  memberContributionFormControls = inject(CONTRIBUTION_DETAILS_FORM_CONTROLS);

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: ContributionsService
  ) {
    super(authService);
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.type = params.get('type') as ContributionType;
      })
    );
    this.subscriptions.add(
      this.route.data.subscribe({
        next: (data: Data) => {
          this.contribution = data['contribution'];
          this.contributionId = this.contribution?.id;

          if (this.pageAction == 'update') {
            if (this.contribution) {
              this.memberContributionFormControls.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  form.forEach(
                    (control: DynamicCustomFormControlBase<ValueType>) => {
                      if (control) {
                        control.value = (
                          this.contribution as unknown as Record<
                            string,
                            ValueType
                          >
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

  override ngOnInit(): void {
    super.ngOnInit();

    this.memberContributionFormControls.forEach(
      (form: DynamicCustomFormControlBase<ValueType>[]) => {
        form.forEach((control: DynamicCustomFormControlBase<ValueType>) => {
          if (control) {
            if (
              (this.type == ContributionType.BereavedMember ||
                this.type == ContributionType.DeceasedMember) &&
              control.key == 'to'
            ) {
              control.visible = false;
            } else {
              control.visible = true;
            }
            if (this.member && control.key == 'from') {
              control.visible = false;
            }
          }
        });
      }
    );
  }

  onValidityNotified(formData: string) {
    const data = JSON.parse(formData);
    this.contribution = data;
    this.isProceedAllowed = true;
  }

  save() {
    this.isSubmitting = true;

    const payload: any = {
      ...this.contribution,
    };

    payload['type'] = this.type;

    console.log('contrib', payload);

    let serviceAction;

    if (this.pageAction == 'update') {
      serviceAction = this.service.update(this.contributionId!, payload);
    } else {
      serviceAction = this.service.create(payload);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = false;

          this.router.navigate(['/', 'contributions', id]);

          const snackBarRef = this.snackbar.open(
            `Contribution successfully ${this.pageAction}d. Navigate back to Contributions List?`,
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
type IsSelected = [boolean, boolean, boolean, boolean];
