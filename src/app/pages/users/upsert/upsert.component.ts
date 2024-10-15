import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/form-control/form.component';

import { DynamicCustomFormControlBase } from '../../../shared/form-control/form.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { UsersService } from '../users.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PageDirective } from '../../../shared/page/page.directive';
import { Welfare } from '../../welfares/model';
import { Child, MembershipRole, Spouse, User, UserRole } from '../model';
import { Membership } from '../../memberships/model';
import { ValueType } from '../../../shared/form-control/control.component';
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
export class UpsertComponent extends PageDirective {
  pageTitle!: string;
  pageAction!: 'update' | 'create';
  viewUrl!: string;
  listUrl: string = '/users';

  user?: User;
  membership?: Membership;
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
    'Core User Details': false,
    'Welfare Details': false,
    'Spouse Details': false,
    'Children Details': false,
  };

  readonly checks: IsProceedAllowed = {
    'Create New Welfare': false,
    'Not Married': false,
    'No Children': false,
  };

  displayMembershipRoleControl: boolean = false;
  displayMembershipForm: boolean = false;
  canCreateNewWelfare: boolean = false;

  validChildren: boolean[] = [false];

  $triggerValidityNotification = new BehaviorSubject(false);
  $isSubmitting = new BehaviorSubject(false);

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: UsersService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.pageAction = data['action'];
      this.viewUrl = `/users/view/${this.route.snapshot.paramMap.get('id')}`;

      this.user = data['user'];
      this.membership = this.user?.membership;
      this.welfare = this.membership?.welfare;

      this.spouse = this.user?.spouse;
      this.children = this.user?.children;

      this.welfares = data['welfares'];

      if (this.pageAction == 'update') {
        if (this.user) {
          this.coreUserDetailsFormControls$.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  if (control) {
                    control.value =
                      ((
                        this.user as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date) ||
                      ((
                        this.membership as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string);
                  }
                }
              );
            }
          );

          this.tryDisplayingMembershipRoleControl(this.user.user_role);
          if (this.membership) {
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
            this.tryDisplayingMembershipForm(this.membership.membership_role);
            this.checkCanCreateNewWelfare(this.membership.membership_role);
          }
          this.isProceedAllowed['Core User Details'] = true;

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

  tryDisplayingMembershipRoleControl(role: UserRole) {
    const userRole = [UserRole.CLIENT];

    this.displayMembershipRoleControl = userRole.includes(role);
    this.coreUserDetailsFormControls$.forEach((formGroup) => {
      formGroup.forEach((control) => {
        if (control.key == 'membership_role' || control.key == 'status') {
          control.visible = this.displayMembershipRoleControl;
        }
      });
    });
  }

  tryDisplayingMembershipForm(role: MembershipRole) {
    const membershipRoles = [
      MembershipRole.WELFARE_MANAGER,
      MembershipRole.WELFARE_ACCOUNTANT,
      MembershipRole.WELFARE_SECRETARY,
      MembershipRole.WELFARE_MEMBER,
    ];

    this.displayMembershipForm = membershipRoles.includes(role);
  }

  checkCanCreateNewWelfare(role: MembershipRole) {
    const canCreateWelfareRoles = [MembershipRole.WELFARE_MANAGER];

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
      case 'Core User Details':
        const { status, membership_role } = data;

        this.user = <User>{ ...data };
        this.tryDisplayingMembershipRoleControl(this.user?.user_role!);

        if (this.displayMembershipRoleControl) {
          this.membership = <Membership>{ status, membership_role };
          this.tryDisplayingMembershipForm(this.membership?.membership_role!);
          this.checkCanCreateNewWelfare(this.membership?.membership_role!);
        } else {
          delete this.membership;
          delete this.welfare;
          delete this.spouse;
          delete this.children;
          this.displayMembershipForm = false;
          this.canCreateNewWelfare = false;
        }
        this.isProceedAllowed['Core User Details'] = true;

        this.coreUserDetailsFormControls$.forEach(
          (controls: DynamicCustomFormControlBase<any>[]) => {
            controls.forEach((control) => {
              if (control.key == 'welfare') {
                control.visible = this.displayMembershipForm;
                control.required = this.displayMembershipForm;
                if (this.displayMembershipForm && !this.welfare?.id) {
                  this.isProceedAllowed['Core User Details'] = false;
                }
              }
            });
          }
        );

        break;
      case 'Welfare Details':
        console.log('welfare', data);
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
      userDto: this.user,
    };

    if (this.membership) {
      payload['membershipDto'] = this.membership;
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
      serviceAction$ = this.service.updateUser(
        this.user?.id as number,
        payload
      );
    } else {
      serviceAction$ = this.service.createUser(payload);
    }

    this.$subscriptions$.add(
      serviceAction$.subscribe({
        next: ({ id }) => {
          this.isSubmitting$ = false;

          this.router.navigate(['/', 'users', 'view', id]);

          const snackbar = inject(MatSnackBar);
          const snackBarRef = snackbar.open(
            `User successfully ${this.pageAction}d. Navigate back to Users List?`,
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
