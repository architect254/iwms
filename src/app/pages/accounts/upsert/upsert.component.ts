import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthService } from '../../../core/services/auth.service';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { DynamicFormComponent } from '../../../shared/components/form-control/form.component';
import { DynamicCustomFormControlBase } from '../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Member, MemberRole } from '../../members/model';
import { Welfare } from '../../welfares/model';
import { AccountsService } from '../accounts.service';
import { Account, Spouse, Child, Class, AccountApplication } from '../model';
import {
  childDetailsFormControls,
  coreUserDetailsFormControls,
  newWelfareDetailsFormControls,
  spouseDetailsFormControls,
  chooseWelfareFormControls,
} from './model';
import { WelfaresService } from '../../welfares/welfares.service';
import {
  EditableViewPage,
  IsProceedAllowed,
} from '../../../shared/directives/view-page/editable-view-page.directive';

export const CORE_USER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('core user details form controls');

export const NEW_WELFARE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('new welfare details form controls');

export const CHOOSE_WELFARE_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('choose welfare form control');

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
      provide: CORE_USER_DETAILS_FORM_CONTROLS,
      useFactory: coreUserDetailsFormControls,
    },
    {
      provide: NEW_WELFARE_DETAILS_FORM_CONTROLS,
      useFactory: newWelfareDetailsFormControls,
    },
    {
      provide: CHOOSE_WELFARE_FORM_CONTROLS,
      useFactory: chooseWelfareFormControls,
      deps: [WelfaresService],
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
  override listUrl: string = '/accounts';

  account?: Account;
  member?: Member;
  welfare?: Welfare | { id: number };

  spouse?: Spouse;
  children?: Child[];

  welfares!: Welfare[];

  coreUserDetailsFormControls = inject(CORE_USER_DETAILS_FORM_CONTROLS);
  newWelfareDetailsFormControls = inject(NEW_WELFARE_DETAILS_FORM_CONTROLS);
  chooseWelfareFormControls = inject(CHOOSE_WELFARE_FORM_CONTROLS);
  spouseDetailsFormControls = inject(SPOUSE_DETAILS_FORM_CONTROLS);
  childrenDetailsFormControls = [inject(CHILD_DETAILS_FORM_CONTROLS)];

  readonly isSelected: IsSelected = [true, false, false, false];

  override readonly isProceedAllowed: IsProceedAllowed = {
    'Core Account Details': false,
    'Welfare Details': false,
    'Spouse Details': false,
    'Children Details': false,
  };

  readonly checks: IsProceedAllowed = {
    'Create New Welfare': false,
    'Not Married': false,
    'No Children': false,
  };

  displayMemberControls: boolean = false;
  displayMemberForm: boolean = false;
  canCreateNewWelfare: boolean = false;

  validChildren: boolean[] = [false];

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: AccountsService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        // this.pageTitle = data['title'];
        this.pageAction = data['action'];
        this.viewUrl = `/accounts/${this.route.snapshot.paramMap.get('id')}`;

        this.account = data['account'];
        this.member = this.account?.member;
        this.welfare = this.member?.welfare;

        this.spouse = this.account?.spouse;
        this.children = this.account?.children;

        this.welfares = data['welfares'];

        if (this.pageAction == 'update') {
          if (this.account) {
            this.coreUserDetailsFormControls.forEach(
              (form: DynamicCustomFormControlBase<ValueType>[]) => {
                form.forEach(
                  (control: DynamicCustomFormControlBase<ValueType>) => {
                    if (control) {
                      control.value =
                        ((this.account as unknown as Record<string, ValueType>)[
                          control.key
                        ] as ValueType) ||
                        ((this.member as unknown as Record<string, ValueType>)[
                          control.key
                        ] as string);
                    }
                  }
                );
              }
            );

            this.tryDisplayingMemberControls(this.account.class);
            if (this.member) {
              if (this.welfare) {
                this.chooseWelfareFormControls.forEach(
                  (form: DynamicCustomFormControlBase<ValueType>[]) => {
                    form.forEach(
                      (control: DynamicCustomFormControlBase<ValueType>) => {
                        if (control) {
                          control.value = this.welfare?.id;
                        }
                      }
                    );
                  }
                );

                this.isProceedAllowed['Welfare Details'] = true;
              }
              this.tryDisplayingMemberForm(this.member.role);
              this.checkCanCreateNewWelfare(this.member.role);
            }
            this.isProceedAllowed['Core Account Details'] = true;

            if (this.spouse) {
              this.spouseDetailsFormControls.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  form.forEach(
                    (control: DynamicCustomFormControlBase<ValueType>) => {
                      Object.entries<ValueType>(
                        this.spouse as unknown as { [key: string]: ValueType }
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

            if (this.children) {
              this.children.forEach((child, childIndex) => {
                if (childIndex > 0) {
                  this.childrenDetailsFormControls.push(
                    childDetailsFormControls()
                  );

                  this.validChildren.push(true);
                }
              });

              this.childrenDetailsFormControls.forEach(
                (
                  formGroup: Observable<
                    DynamicCustomFormControlBase<ValueType>[]
                  >,
                  formGroupIndex
                ) => {
                  formGroup.forEach(
                    (form: DynamicCustomFormControlBase<ValueType>[]) => {
                      if (form) {
                        this.children?.forEach(
                          (child, childIndex, children) => {
                            form.forEach(
                              (
                                control: DynamicCustomFormControlBase<ValueType>
                              ) => {
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
                          }
                        );
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
        }
      })
    );
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

  addChild() {
    this.childrenDetailsFormControls.push(childDetailsFormControls());
    this.validChildren.push(false);
  }

  check(checked: boolean, section: string) {
    this.checks[section] = checked;
    switch (section) {
      case 'Create New Welfare':
        delete this.welfare;
        if (checked) {
          this.isProceedAllowed['Welfare Details'] = false;
        } else {
          if (this.isProceedAllowed['Welfare Details']) {
            this.isProceedAllowed['Welfare Details'] = false;
          }
        }
        break;
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

  tryDisplayingMemberControls(classification: Class) {
    const accountClassifications = [Class.Client];

    this.displayMemberControls =
      accountClassifications.includes(classification);
    this.coreUserDetailsFormControls.forEach((formGroup) => {
      formGroup.forEach((control) => {
        if (control.key == 'role' || control.key == 'm_status') {
          control.visible = this.displayMemberControls;
        }
      });
    });
  }

  tryDisplayingMemberForm(role: MemberRole) {
    const memberRoles = [
      MemberRole.Manager,
      MemberRole.Accountant,
      MemberRole.Secretary,
      MemberRole.Member,
    ];

    this.displayMemberForm = memberRoles.includes(role);
  }

  checkCanCreateNewWelfare(role: MemberRole) {
    const canCreateWelfareRoles = [MemberRole.Manager];

    this.canCreateNewWelfare = canCreateWelfareRoles.includes(role);

    if (!this.canCreateNewWelfare) {
      this.check(false, 'Create New Welfare');
    } else {
      if (this.welfare) {
        this.canCreateNewWelfare = false;
      } else {
        this.canCreateNewWelfare = true;
      }
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
      case 'Core Account Details':
        const { role, m_status } = data;

        this.account = <AccountApplication>{ ...data };
        this.tryDisplayingMemberControls(this.account?.class!);

        if (this.displayMemberControls) {
          this.member = <Member>{ role, status: m_status };
          this.tryDisplayingMemberForm(this.member?.role!);
          this.checkCanCreateNewWelfare(this.member?.role!);
        } else {
          delete this.member;
          delete this.welfare;
          delete this.spouse;
          delete this.children;
          this.displayMemberForm = false;
          this.canCreateNewWelfare = false;
        }
        this.isProceedAllowed['Core Account Details'] = true;

        this.coreUserDetailsFormControls.forEach(
          (controls: DynamicCustomFormControlBase<any>[]) => {
            controls.forEach((control) => {
              if (control.key == 'welfare') {
                control.visible = this.displayMemberForm;
                control.required = this.displayMemberForm;
                if (this.displayMemberForm && !this.welfare?.id) {
                  this.isProceedAllowed['Core Account Details'] = false;
                }
              }
            });
          }
        );

        break;
      case 'Welfare Details':
        if (data.id) {
          this.welfare = <{ id: number }>{ ...data };
        } else {
          this.welfare = <Welfare>{ ...data };
        }
        this.isProceedAllowed['Welfare Details'] = true;
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

    if (this.welfare) {
      payload['welfareDto'] = this.welfare;
    }

    if (this.spouse) {
      payload['spouseDto'] = this.spouse;
    }
    if (this.children) {
      payload['childrenDto'] = this.children;
    }

    let serviceAction;

    if (this.pageAction == 'update') {
      serviceAction = this.service.updateAccount(
        this.account?.id as number,
        payload
      );
    } else {
      serviceAction = this.service.createAccount(payload);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = false;

          this.router.navigate(['/', 'accounts', 'view', id]);

          const snackbar = inject(MatSnackBar);
          const snackBarRef = snackbar.open(
            `Account successfully ${this.pageAction}d. Navigate back to Accounts List?`,
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
}
type IsSelected = [boolean, boolean, boolean, boolean];
