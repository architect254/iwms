import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { Welfare } from '../../welfares/welfare';
import { Child, Spouse, User } from '../user.model';
import { Membership } from '../../memberships/membership';
import { ValueType } from '../../../shared/form-control/control.component';

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
  pageTitle: string = '';
  viewUrl: string = '';

  user!: User;
  membership!: Membership;
  welfare!: Welfare;

  spouse!: Spouse;
  children!: Child[];

  welfares!: Welfare[];

  coreUserDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  >;
  newWelfareDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  >;
  welfareDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  >;
  spouseDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  >;
  childrenDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  >[];

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

  displayMembershipForm: boolean = false;
  canCreateNewWelfare: boolean = false;

  validChildren: boolean[] = [false];

  userDto!: UserDto;
  welfareDto!: WelfareDto | undefined;

  spouseDto!: SpouseDto | undefined;
  childrenDto!: ChildDto[] | undefined;

  $triggerValidityNotification = new BehaviorSubject(false);
  $isSubmitting = new BehaviorSubject(false);

  constructor(private service: UsersService) {
    super();
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.viewUrl = `/users/view/${this.route.snapshot.paramMap.get('id')}`;

      this.coreUserDetailsFormControls$ =
        this.service.getCoreUserDetailsFormControls();
      this.newWelfareDetailsFormControls$ =
        this.service.newWelfareDetailsFormControls();

      this.spouseDetailsFormControls$ =
        this.service.getSpouseDetailsFormControls();
      this.childrenDetailsFormControls$ = [
        this.service.getChildDetailsFormControls(),
      ];

      this.user = data['user'] as User;
      if (this.user) {
        this.coreUserDetailsFormControls$.forEach(
          (form: DynamicCustomFormControlBase<ValueType>[]) => {
            form.forEach((control: DynamicCustomFormControlBase<ValueType>) => {
              Object.entries<ValueType>(
                this.user as { [key: string]: ValueType }
              ).forEach((entry, index, entries) => {
                const [key, value] = entry;
                if (control.key == key) {
                  control.value = value;
                }
              });
            });
          }
        );

        this.tryDisplayingMembershipForm(this.user['role'] as string);
        this.checkCanCreateNewWelfare(this.user['role'] as string);
        this.isProceedAllowed['Core User Details'] = true;

        this.welfare = data['welfare'];

        if (this.welfare) {
          this.welfareDetailsFormControls$.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  Object.entries<ValueType>(
                    this.welfare as { [key: string]: ValueType }
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

          this.check(false, 'Create New Welfare');
          this.isProceedAllowed['Welfare Details'] = true;
        }

        this.spouse = this.user.spouse!;

        if (this.spouse) {
          this.spouseDetailsFormControls$.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  Object.entries<ValueType>(
                    this.spouse as { [key: string]: ValueType }
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

        this.children = this.user['children'] as Child[];

        if (this.children?.length) {
          this.childrenDetailsFormControls$ = [
            this.service.getChildDetailsFormControls(),
          ];

          this.validChildren = [true];

          this.children.forEach((child, index) => {
            this.childrenDetailsFormControls$.push(
              this.service.getChildDetailsFormControls()
            );

            this.validChildren.push(true);
          });

          this.childrenDetailsFormControls$.forEach(
            (
              formGroup: Observable<DynamicCustomFormControlBase<ValueType>[]>,
              formGroupIndex
            ) => {
              formGroup.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  if (form) {
                    this.children.forEach((child, childIndex, children) => {
                      form.forEach(
                        (control: DynamicCustomFormControlBase<ValueType>) => {
                          Object.entries<ValueType>(
                            child as { [key: string]: ValueType }
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

      this.welfares = data['welfares'];
      if (this.welfares?.length) {
        this.welfareDetailsFormControls$ =
          this.service.welfareDetailsFormControls(this.welfares);
      }
    });
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

  override ngOnInit(): void {
    super.ngOnInit();
    this.triggerValidityNotification = true;
  }

  check(checked: boolean, section: string) {
    this.checks[section] = checked;
    switch (section) {
      case 'Create New Welfare':
        delete this.welfareDto;
        if (checked) {
          this.isProceedAllowed['Welfare Details'] = false;
        } else {
          if (this.isProceedAllowed['Welfare Details']) {
            this.isProceedAllowed['Welfare Details'] = false;
          }
        }
        break;
      case 'Not Married':
        delete this.spouseDto;

        if (checked) {
          this.isProceedAllowed['Spouse Details'] = true;
        } else {
          this.isProceedAllowed['Spouse Details'] = false;
        }

        break;
      case 'No Children':
        delete this.childrenDto;

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

  tryDisplayingMembershipForm(role: string) {
    const membershipRoles = [
      'Welfare Manager',
      'Welfare Accountant',
      'Welfare Secretary',
      'Welfare Client Member',
    ];

    this.displayMembershipForm = membershipRoles.includes(role);
  }

  checkCanCreateNewWelfare(role: string) {
    const canCreateWelfareRoles = ['Welfare Manager'];

    this.canCreateNewWelfare = canCreateWelfareRoles.includes(role);

    if (!this.canCreateNewWelfare) {
      this.check(false, 'Create New Welfare');
    }
  }

  addChild() {
    this.childrenDetailsFormControls$.push(
      this.service.getChildDetailsFormControls()
    );
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
        this.userDto = { ...data };
        this.isProceedAllowed['Core User Details'] = true;

        this.checkCanCreateNewWelfare(this.userDto.role!);
        this.tryDisplayingMembershipForm(this.userDto.role!);

        this.coreUserDetailsFormControls$.forEach(
          (controls: DynamicCustomFormControlBase<any>[]) => {
            controls.forEach((control) => {
              if (control.key == 'welfare') {
                control.visible = this.displayMembershipForm;
                control.required = this.displayMembershipForm;
                if (this.displayMembershipForm && !this.userDto.group_id!) {
                  this.isProceedAllowed['Core User Details'] = false;
                }
              }
            });
          }
        );

        break;
      case 'Welfare Details':
        this.welfareDto = { ...data };
        this.isProceedAllowed['Welfare Details'] = true;
        break;

      case 'Spouse Details':
        this.spouseDto = { ...data };
        this.isProceedAllowed['Spouse Details'] = true;
        break;
      case 'Children Details':
        if (childDetailsIndex == 0) {
          this.childrenDto = [];
        }

        this.childrenDto![childDetailsIndex] = { ...data };
        this.validChildren[childDetailsIndex] = validOffspring;

        break;
      default:
        break;
    }
  }

  save() {
    this.isSubmitting$ = true;

    const payload: any = {
      userDto: this.userDto,
    };

    payload['membershipDto'] = { status: 'Inactive' };

    if (this.welfareDto) {
      payload['welfareDto'] = this.welfareDto;
    }

    if (this.spouseDto) {
      payload['spouseDto'] = this.spouseDto;
    }
    if (this.childrenDto) {
      payload['childrenDto'] = this.childrenDto;
    }

    let serverAction: 'create' | 'update';
    let serviceAction$;

    if (this.user) {
      serverAction = 'update';
      serviceAction$ = this.service.updateUser(this.user.id as number, payload);
    } else {
      serverAction = 'create';
      serviceAction$ = this.service.createUser(payload);
    }

    this.$subscriptions$.add(
      serviceAction$.subscribe({
        next: ({ id }) => {
          this.isSubmitting$ = false;

          this.router.navigate(['/', 'users', 'view', id]);

          const snackbar = inject(MatSnackBar);
          const snackBarRef = snackbar.open(
            `User successfully ${serverAction}d. Navigate back to Users List?`,
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

type UserDto = {
  first_name?: string;
  last_name?: string;
  id_number?: string;
  birth_date?: Date;
  phone_number?: string;
  email?: string;
  role?: string;
  group_id?: string;
};

type WelfareDto =
  | {
      name?: string;
      phone_number?: string;
      email?: string;
    }
  | { groupId?: number };

type SpouseDto = {
  first_name?: string;
  last_name?: string;
  id_number?: string;
  birth_date?: Date;
  phone_number?: string;
  email?: string;
};

type ChildDto = {
  first_name?: string;
  last_name?: string;
  birth_date?: Date;
};
