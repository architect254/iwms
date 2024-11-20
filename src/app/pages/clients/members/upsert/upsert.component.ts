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
import { Member } from '../../../../core/entities/member.entity';
import { Spouse } from '../../../../core/entities/spouse.entity';
import { Welfare } from '../../../../core/entities/welfare.entity';
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicFormComponent } from '../../../../shared/components/form-control/form.component';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { EditableViewPage } from '../../../../shared/directives/view-page/editable-view-page.directive';
import { MembersService } from '../members.service';
import {
  coreMemberDetailsFormControls,
  spouseDetailsFormControls,
  childDetailsFormControls,
} from './model';
import { Membership } from '../../../../core/entities/user.entity';

export const CORE_MEMBER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('core member details form controls');

export const SPOUSE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('spouse details form controls');

export const CHILD_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('child details form controls');

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
      provide: CORE_MEMBER_DETAILS_FORM_CONTROLS,
      useFactory: coreMemberDetailsFormControls,
    },
    {
      provide: SPOUSE_DETAILS_FORM_CONTROLS,
      useFactory: spouseDetailsFormControls,
    },
    {
      provide: CHILD_DETAILS_FORM_CONTROLS,
      useFactory: childDetailsFormControls,
    },
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends EditableViewPage {
  member?: Member | BereavedMember | DeceasedMember | DeactivatedMember;
  memberId?: string;
  welfare?: Welfare | { id: number };

  spouse?: Spouse;
  children?: Child[];

  welfareId!: string;

  coreMemberDetailsFormControls = inject(CORE_MEMBER_DETAILS_FORM_CONTROLS);
  spouseDetailsFormControls = inject(SPOUSE_DETAILS_FORM_CONTROLS);
  childrenDetailsFormControls = [inject(CHILD_DETAILS_FORM_CONTROLS)];

  readonly isSelected: IsSelected = [true, false, false];

  override readonly isProceedAllowed: Record<string, boolean> = {
    'Core Member Details': false,
    'Spouse Details': false,
    'Children Details': false,
  };

  readonly checks: Record<string, boolean> = {
    'Not Married': false,
    'No Children': false,
  };

  validChildren: boolean[] = [false];

  constructor(private service: MembersService) {
    super();
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.welfareId = params.get('welfareId')!;
      })
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe({
        next: (data: Data) => {
          this.member = data['member'];
          this.memberId = this.member?.id;

          this.spouse = this.member?.spouse;
          this.children = this.member?.children;

          if (this.member) {
            this.coreMemberDetailsFormControls.forEach(
              (form: DynamicCustomFormControlBase<ValueType>[]) => {
                form.forEach(
                  (control: DynamicCustomFormControlBase<ValueType>) => {
                    if (control) {
                      control.value = (
                        this.member as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date;
                    }
                  }
                );
              }
            );
          }

          if (this.spouse) {
            this.spouseDetailsFormControls.forEach(
              (form: DynamicCustomFormControlBase<ValueType>[]) => {
                form.forEach(
                  (control: DynamicCustomFormControlBase<ValueType>) => {
                    if (control) {
                      control.value = (
                        this.spouse as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date;
                    }
                  }
                );
              }
            );
          }

          if (this.children) {
            this.children.forEach((child, index) => {
              if (index > 0) {
                this.childrenDetailsFormControls.push(
                  childDetailsFormControls()
                );
                this.validChildren.push(true);
              } else {
                this.validChildren = [true];
              }
              this.childrenDetailsFormControls[index].forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  form.forEach(
                    (control: DynamicCustomFormControlBase<ValueType>) => {
                      if (control) {
                        control.value = (
                          child as unknown as Record<
                            string,
                            string | number | Date
                          >
                        )[control.key] as string | number | Date;
                      }
                    }
                  );
                }
              );
            });
          }
        },
      })
    );
  }

  set selected(index: number) {
    this.isSelected[index] = true;
  }

  getSelected(index: number) {
    return this.isSelected[index];
  }

  get areChildrenValid() {
    return this.validChildren.reduce(
      (previusChildrenValid: boolean, currentOffspringValid: boolean) => {
        return previusChildrenValid && currentOffspringValid;
      }
    );
  }

  addChild() {
    this.childrenDetailsFormControls.push(childDetailsFormControls());
    this.validChildren.push(false);
  }

  check(checked: boolean, section: string) {
    this.checks[section] = checked;
    switch (section) {
      case 'Not Married':
        delete this.spouse;

        if (checked) {
          this.isProceedAllowed['Spouse Details'] = true;
        } else {
          this.isProceedAllowed['Spouse Details'] = false;
        }
        break;
      case 'No Children':
        delete this.children;

        if (checked) {
          this.isProceedAllowed['Children Details'] = true;
        } else {
          this.isProceedAllowed['Children Details'] = false;
          this.validChildren.map(() => false);
        }
        break;

      default:
        break;
    }
  }

  onValidityNotified(
    formData: string,
    section: string,
    childDetailsIndex?: number,
    validOffspring?: boolean
  ) {
    const data = JSON.parse(formData);
    switch (section) {
      case 'Core Member Details':
        this.member = { ...data };
        this.isProceedAllowed['Core Member Details'] = true;

        break;
      case 'Spouse Details':
        this.spouse = <Spouse>{ ...data };
        this.isProceedAllowed['Spouse Details'] = true;
        break;
      case 'Children Details':
        if (childDetailsIndex == 0) {
          this.children = [];
        }
        this.children![childDetailsIndex!] = <Child>{ ...data };
        this.validChildren[childDetailsIndex!] = validOffspring!;
        break;
      default:
        break;
    }
  }

  save() {
    this.isSubmitting = true;

    const payload: any = {
      ...this.member,
    };

    if (this.welfareId) {
      payload['welfareId'] = this.welfareId;
    }
    payload['membership'] = Membership.Active;

    if (this.spouse) {
      payload['spouseDto'] = this.spouse;
    }
    if (this.children) {
      payload['childrenDto'] = this.children;
    }

    let serviceAction;

    if (this.pageAction == 'update') {
      serviceAction = this.service.update(this.memberId!, payload);
    } else {
      serviceAction = this.service.create(payload);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = false;

          this.router.navigate(['/', 'members', id]);

          const snackBarRef = this.snackbar.open(
            `Member successfully ${this.pageAction}d. Navigate back to Members List?`,
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
type IsSelected = [boolean, boolean, boolean];
