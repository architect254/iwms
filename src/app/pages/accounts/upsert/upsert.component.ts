import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/components/form-control/form.component';

import { DynamicCustomFormControlBase } from '../../../shared/components/form-control/form.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AccountsService } from '../accounts.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Page } from '../../../shared/directives/page/page.directive';
import { Welfare } from '../../welfares/model';
import {
  Child,
  Spouse,
  Account,
  AccountType,
  AccountApplication,
} from '../model';
import { Member, MemberRole } from '../../members/model';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { AuthService } from '../../../core/services/auth.service';
import {
  childDetailsFormControls,
  coreUserDetailsFormControls,
  newWelfareDetailsFormControls,
  spouseDetailsFormControls,
  welfareDetailsFormControls,
} from './model';

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
  providers: [],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends Page {
  pageTitle!: string;
  pageAction!: 'update' | 'create';
  viewUrl!: string;
  listUrl: string = '/users';

  account?: Account;
  member?: Member;
  welfare?: Welfare | { id: number };

  spouse?: Spouse;
  children?: Child[];

  welfares!: Welfare[];

  coreUserDetailsFormControls$: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  > = coreUserDetailsFormControls();
  newWelfareDetailsFormControls$: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  > = newWelfareDetailsFormControls();
  welfareDetailsFormControls$: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  > = welfareDetailsFormControls(this.welfares);
  spouseDetailsFormControls$: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  > = spouseDetailsFormControls();
  childrenDetailsFormControls$: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  >[] = [childDetailsFormControls()];

  readonly isSelected: IsSelected = [true, false, false, false];

  readonly isProceedAllowed: IsProceedAllowed = {
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

  $triggerValidityNotification = new BehaviorSubject(false);
  $isSubmitting = new BehaviorSubject(false);

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: AccountsService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.pageAction = data['action'];
      this.viewUrl = `/users/view/${this.route.snapshot.paramMap.get('id')}`;

      this.account = data['account'];
      this.member = this.account?.member;
      this.welfare = this.member?.welfare;

      this.spouse = this.account?.spouse;
      this.children = this.account?.children;

      this.welfares = data['welfares'];

      if (this.pageAction == 'update') {
        if (this.account) {
          this.coreUserDetailsFormControls$.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  if (control) {
                    control.value =
                      ((
                        this.account as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date) ||
                      ((
                        this.member as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string);
                  }
                }
              );
            }
          );

          this.tryDisplayingMemberControls(this.account.type);
          if (this.member) {
            if (this.welfare) {
              this.welfareDetailsFormControls$.forEach(
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
            this.spouseDetailsFormControls$.forEach(
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
                this.childrenDetailsFormControls$.push(
                  childDetailsFormControls()
                );

                this.validChildren.push(true);
              }
            });

            this.childrenDetailsFormControls$.forEach(
              (
                formGroup: Observable<
                  DynamicCustomFormControlBase<ValueType>[]
                >,
                formGroupIndex
              ) => {
                formGroup.forEach(
                  (form: DynamicCustomFormControlBase<ValueType>[]) => {
                    if (form) {
                      this.children?.forEach((child, childIndex, children) => {
                        form.forEach(
                          (
                            control: DynamicCustomFormControlBase<ValueType>
                          ) => {
                            Object.entries<ValueType>(
                              child as unknown as { [key: string]: ValueType }
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
      }

      if (this.welfares) {
        this.welfareDetailsFormControls$.forEach(
          (form: DynamicCustomFormControlBase<ValueType>[]) => {
            form.forEach((control: DynamicCustomFormControlBase<ValueType>) => {
              if (control) {
                control.options = this.welfares.map((welfare) => {
                  return { id: welfare.id, name: welfare.name };
                });
              }
            });
          }
        );
      }
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  set selected(index: number) {
    this.isSelected[index] = true;
  }

  get areChildrenValid() {
    return this.validChildren.reduce(
      (previusChildrenValid: boolean, currentOffspringValid: boolean) => {
        return currentOffspringValid;
      }
    );
  }

  get isSubmitting$(): Observable<boolean> {
    return this.$isSubmitting.asObservable();
  }

  set isSubmitting$(isIt: boolean) {
    this.$isSubmitting.next(isIt);
  }

  get triggerValidityNotification$() {
    return this.$triggerValidityNotification.asObservable();
  }

  set triggerValidityNotification(doTrigger: boolean) {
    this.$triggerValidityNotification.next(doTrigger);
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

  tryDisplayingMemberControls(type: AccountType) {
    const accountType = [AccountType.Client];

    this.displayMemberControls = accountType.includes(type);
    this.coreUserDetailsFormControls$.forEach((formGroup) => {
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

  addChild() {
    this.childrenDetailsFormControls$.push(childDetailsFormControls());
    this.validChildren.push(false);
  }

  onValidityNotified(
    formData: string,
    section: string,
    childDetailsIndex: number = 0,
    validOffspring: boolean = false
  ) {
    const data = JSON.parse(formData);
    switch (section) {
      case 'Core Account Details':
        const { role, m_status } = data;

        this.account = <AccountApplication>{ ...data };
        this.tryDisplayingMemberControls(this.account?.type!);

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

        this.coreUserDetailsFormControls$.forEach(
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

        this.children![childDetailsIndex] = <Child>{ ...data };
        this.validChildren[childDetailsIndex] = validOffspring;

        break;
      default:
        break;
    }
  }

  save() {
    this.isSubmitting$ = true;

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

    let serviceAction$;

    if (this.pageAction == 'update') {
      serviceAction$ = this.service.updateAccount(
        this.account?.id as number,
        payload
      );
    } else {
      serviceAction$ = this.service.createAccount(payload);
    }

    this.$subscriptions$.add(
      serviceAction$.subscribe({
        next: ({ id }) => {
          this.isSubmitting$ = false;

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
          this.isSubmitting$ = false;
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
type IsSelected = [boolean, boolean, boolean, boolean];
type IsProceedAllowed = { [key: string]: boolean };
