import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/components/form-control/form.component';

import { DynamicCustomFormControlBase } from '../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { AuthService } from '../../../core/services/auth.service';
import {
  childDetailsFormControls,
  memberDetailsFormControls,
  spouseDetailsFormControls,
} from './model';
import { MembersService } from '../members.service';
import { Member } from '../model';
import {
  EditableViewPage,
  IsProceedAllowed,
} from '../../../shared/directives/view-page/editable-view-page.directive';
import {
  Account,
  Spouse,
  Child,
  AccountApplication,
} from '../../accounts/model';

export const MEMBER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('member details form controls');

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
      provide: MEMBER_DETAILS_FORM_CONTROLS,
      useFactory: memberDetailsFormControls,
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
  override listUrl: string = '/members';

  member!: Member;
  memberId?: string | number;

  account?: Account;

  spouse?: Spouse;
  children?: Child[];

  memberDetailsFormControls = inject(MEMBER_DETAILS_FORM_CONTROLS);
  spouseDetailsFormControls = inject(SPOUSE_DETAILS_FORM_CONTROLS);
  childrenDetailsFormControls = [inject(CHILD_DETAILS_FORM_CONTROLS)];

  readonly isSelected: IsSelected = [true, false, false];

  override readonly isProceedAllowed: IsProceedAllowed = {
    'Member Details': false,
    'Spouse Details': false,
    'Children Details': false,
  };

  readonly checks: IsProceedAllowed = {
    'Not Married': false,
    'No Children': false,
  };

  validChildren: boolean[] = [false];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: MembersService
  ) {
    super(authService);
  }

  set selected(index: number) {
    this.isSelected[index] = true;
  }

  get areChildrenValid() {
    return this.validChildren.reduce(
      (previusChildrenValid: boolean, currentOffspringValid: boolean) => {
        return previusChildrenValid && currentOffspringValid;
      }
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.data.subscribe((data: Data) => {
      this.pageAction = data['action'];
      this.viewUrl = `/members/${this.route.snapshot.paramMap.get('id')}`;

      this.member = data['member'];
      this.memberId = this.member?.id;

      this.account = this.member?.account;

      this.spouse = this.account?.spouse;
      this.children = this.account?.children;

      if (this.pageAction == 'update') {
        if (this.member) {
          this.memberDetailsFormControls.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  if (control) {
                    control.value =
                      ((this.account as unknown as Record<string, ValueType>)?.[
                        control.key
                      ] as ValueType) ||
                      ((this.member as unknown as Record<string, ValueType>)?.[
                        control.key
                      ] as ValueType);

                  }
                }
              );
            }
          );
          this.isProceedAllowed['Member Details'] = true;
        }

        if (this.spouse) {
          this.spouseDetailsFormControls.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  Object.entries<ValueType>(
                    this.spouse as unknown as {
                      [key: string]: ValueType;
                    }
                  ).forEach((entry, index, entries) => {
                    const [key, value] = entry;
                    if (control.key == key) {
                      control.value = value;
                    }
                  });
                }
              );
            }
          );

          this.check(false, 'Not Married');
          this.isProceedAllowed['Spouse Details'] = true;
        } else {
          this.check(true, 'Not Married');
        }

        if (this.children?.length) {
          this.children.forEach((child, childIndex) => {
            if (childIndex > 0) {
              this.childrenDetailsFormControls.push(childDetailsFormControls());

              this.validChildren.push(true);
            }
          });

          this.childrenDetailsFormControls.forEach(
            (
              formGroup: Observable<DynamicCustomFormControlBase<ValueType>[]>,
              formGroupIndex
            ) => {
              formGroup.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  if (form) {
                    this.children?.forEach((child, childIndex, children) => {
                      form.forEach(
                        (control: DynamicCustomFormControlBase<ValueType>) => {
                          Object.entries<ValueType>(
                            child as unknown as Record<string, ValueType>
                          ).forEach((entry, index, entries) => {
                            const [key, value] = entry;
                            if (control.key == key) {
                              control.value = value;
                            }
                          });
                        }
                      );
                    });
                  }
                }
              );
            }
          );

          this.check(false, 'No Children');
        } else {
          this.check(true, 'No Children');
        }
      }
    });
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
      case 'Member Details':
        const { role, status } = data;

        this.account = <AccountApplication>{ ...data };

        this.member = <Member>{ role, status };
        this.isProceedAllowed['Member Details'] = true;

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
      accountDto: this.account,
    };

    if (this.member) {
      payload['memberDto'] = this.member;
    }

    if (this.spouse) {
      payload['spouseDto'] = this.spouse;
    }
    if (this.children) {
      payload['childrenDto'] = this.children;
    }

    let serviceAction;

    if (this.pageAction == 'update') {
      serviceAction = this.service.updateMember(this.memberId!, payload);
    } else {
      serviceAction = this.service.createMember(payload);
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
              panelClass: `.upsert-success-alert`,
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

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
type IsSelected = [boolean, boolean, boolean];
