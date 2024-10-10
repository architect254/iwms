import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/form-control/form.component';

import {
  CustomDropdownControl,
  DynamicCustomFormControlBase,
} from '../../../shared/form-control/form.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { UsersService } from '../users.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MembershipsService } from '../../memberships/memberships.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PageDirective } from '../../../shared/page/page.directive';

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

  user!: {
    [key: string]:
      | string
      | number
      | Date
      | {
          [key: string]:
            | string
            | number
            | Date
            | { [key: string]: string | number | Date };
        }
      | { [key: string]: string | number | Date }[];
  };
  welfare!: { [key: string]: string };
  welfares!: { [key: string]: string }[];
  spouse!: { [key: string]: string | number | Date };
  children!: { [key: string]: string | number | Date }[];

  coreUserDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<any>[]
  >;
  newWelfareDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<any>[]
  >;
  welfareDetailsFormControls$!: Observable<DynamicCustomFormControlBase<any>[]>;
  spouseDetailsFormControls$!: Observable<DynamicCustomFormControlBase<any>[]>;
  childrenDetailsFormControls$!: Observable<
    DynamicCustomFormControlBase<any>[]
  >[];

  isProceedAllowed: { [key: string]: boolean } = {
    'Core User Details': false,
    'Welfare Details': false,
    'Spouse Details': false,
    'Children Details': false,
  };

  checks: { [key: string]: boolean } = {
    'Create New Welfare': false,
    'Not Married': false,
    'No Children': false,
  };

  validChildren: boolean[] = [false];

  userFormValues: {
    first_name?: string;
    last_name?: string;
    id_number?: string;
    birth_date?: Date;
    phone_number?: string;
    email?: string;
    role?: string;
    group_id?: string;
  } = {};

  groupFormValues:
    | {
        name?: string;
        phone_number?: string;
        email?: string;
      }
    | { groupId?: number }
    | null = null;

  spouseFormValues: {
    first_name?: string;
    last_name?: string;
    id_number?: string;
    birth_date?: Date;
    phone_number?: string;
    email?: string;
  } | null = null;

  childrenFormValues:
    | {
        first_name?: string;
        last_name?: string;
        birth_date?: Date;
      }[]
    | null = null;

  canCreateNewWelfare: boolean = false;
  displayMembershipForm: boolean = false;

  isSubmitting = new BehaviorSubject(false);

  constructor(
    private snackbar: MatSnackBar,
    private service: UsersService,
    private membershipService: MembershipsService
  ) {
    super();
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.viewUrl = `/users/view/${this.route.snapshot.paramMap.get('id')}`;

      this.coreUserDetailsFormControls$ =
        this.service.getCoreUserDetailsFormControls();
      this.newWelfareDetailsFormControls$ =
        this.service.newWelfareDetailsFormControls();
      this.welfareDetailsFormControls$ =
        this.service.getWelfareDetailsFormControls();
      this.spouseDetailsFormControls$ =
        this.membershipService.getSpouseDetailsFormControls();
      this.childrenDetailsFormControls$ = [
        this.membershipService.getChildDetailsFormControls(),
      ];

      this.user = data['user'];
      if (this.user) {
        this.coreUserDetailsFormControls$.forEach((form) => {
          form.forEach((control) => {
            if (control) {
              control.value = this.user[control.key];
            }
          });
        });
        this.isProceedAllowed['Core User Details'] = true;
        this.checkDisplayMembershipForm(this.user['role'] as string);
        this.checkCanCreateNewWelfare(this.user['role'] as string);

        this.welfare = this.user['membership'] as {
          [key: string]: string | { [key: string]: string };
        }['welfare'] as unknown as {
          [key: string]: string;
        };

        if (this.welfare) {
          this.welfareDetailsFormControls$.forEach((form) => {
            form.forEach((control) => {
              if (control) {
                control.value = this.welfare[control.key];
              }
            });
          });
          this.isProceedAllowed['Welfare Details'] = true;
        }

        this.spouse = this.user['spouse'] as unknown as {
          [key: string]: string | number | Date;
        };

        if (this.spouse) {
          this.spouseDetailsFormControls$.forEach((form) => {
            form.forEach((control) => {
              if (control) {
                control.value = this.spouse[control.key];
              }
            });
          });
          this.checkChange(false, 'Not Married');
          this.isProceedAllowed['Spouse Details'] = true;
        } else {
          this.checkChange(true, 'Not Married');
        }

        this.children = this.user['children'] as {
          [key: string]: string | number | Date;
        }[];

        if (this.children?.length) {
          this.checkChange(false, 'No Children');
          this.children.forEach((child, index) => {
            if (index == 0) {
              this.childrenDetailsFormControls$ = [
                this.membershipService.getChildDetailsFormControls(),
              ];
              this.validChildren = [true];
            } else {
              this.childrenDetailsFormControls$.push(
                this.membershipService.getChildDetailsFormControls()
              );
              this.validChildren.push(true);
            }
          });
          this.childrenDetailsFormControls$.forEach(
            (
              formGroup: Observable<DynamicCustomFormControlBase<any>[]>,
              formGroupIndex
            ) => {
              formGroup.forEach((form: DynamicCustomFormControlBase<any>[]) => {
                if (form) {
                  form.forEach((control: DynamicCustomFormControlBase<any>) => {
                    control.value = this.children[formGroupIndex][control.key];
                  });
                }
              });
            }
          );
        } else {
          this.checkChange(true, 'No Children');
        }
      } else {
        this.displayMembershipForm = false;
        this.isProceedAllowed['Core User Details'] = false;
        this.isProceedAllowed['Welfare Details'] = false;
        this.isProceedAllowed['Spouse Details'] = false;
        this.isProceedAllowed['Children Details'] = false;
        this.checkChange(false, 'Not Married');
        this.checkChange(false, 'No Children');
        this.validChildren = [false];
      }

      this.welfares = data['welfares'];

      if (this.welfares?.length) {
        this.newWelfareDetailsFormControls$.forEach((form) => {
          form.forEach((control) => {
            if (control) {
              this.welfares.forEach((welfare) => {
                control.options.push({
                  id: welfare['id'],
                  name: welfare['name'],
                });
              });
            }
          });
        });
      }
    });
  }

  get areChildrenValid() {
    return this.validChildren.reduce(
      (previusChildrenValid: boolean, currentOffspringValid: boolean) => {
        return currentOffspringValid;
      }
    );
  }

  get isSubmitting$(): Observable<boolean> {
    return this.isSubmitting.asObservable();
  }

  set isSubmitting$(isIt: boolean) {
    this.isSubmitting.next(isIt);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  checkChange(checked: boolean, section: string) {
    this.checks[section] = checked;
    switch (section) {
      case 'Create New Welfare':
        this.groupFormValues = null;
        if (checked) {
          this.isProceedAllowed['Welfare Details'] = false;
        } else {
          if (this.isProceedAllowed['Welfare Details']) {
            this.isProceedAllowed['Welfare Details'] = false;
          }
        }
        break;
      case 'Not Married':
        this.spouseFormValues = null;

        if (checked) {
          this.isProceedAllowed['Spouse Details'] = true;
        } else {
          this.isProceedAllowed['Spouse Details'] = false;
        }

        break;
      case 'No Children':
        this.childrenFormValues = null;

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
    childDetailsIndex: number = 0,
    validOffspring: boolean = false
  ) {
    const data = JSON.parse(formData);
    switch (section) {
      case 'Core User Details':
        this.userFormValues = { ...data };
        this.isProceedAllowed['Core User Details'] = true;

        this.checkCanCreateNewWelfare(this.userFormValues.role!);
        this.checkDisplayMembershipForm(this.userFormValues.role!);

        this.coreUserDetailsFormControls$.forEach(
          (controls: DynamicCustomFormControlBase<any>[]) => {
            controls.forEach((control) => {
              if (control.key == 'welfare') {
                control.visible = this.displayMembershipForm;
                control.required = this.displayMembershipForm;
                if (
                  this.displayMembershipForm &&
                  !this.userFormValues.group_id!
                ) {
                  this.isProceedAllowed['Core User Details'] = false;
                }
              }
            });
          }
        );

        break;
      case 'Welfare Details':
        this.groupFormValues = { ...data };
        this.isProceedAllowed['Welfare Details'] = true;
        break;

      case 'Spouse Details':
        this.spouseFormValues = { ...data };
        this.isProceedAllowed['Spouse Details'] = true;
        break;
      case 'Children Details':
        if (childDetailsIndex == 0) {
          this.childrenFormValues = [];
        }

        this.childrenFormValues![childDetailsIndex] = { ...data };
        this.validChildren[childDetailsIndex] = validOffspring;

        break;
      default:
        break;
    }
  }

  checkCanCreateNewWelfare(role: string) {
    const canCreateWelfareRoles = ['Welfare Manager'];

    this.canCreateNewWelfare = canCreateWelfareRoles.includes(role);

    if (!this.canCreateNewWelfare) {
      this.checkChange(false, 'Create New Welfare');
    }
  }

  checkDisplayMembershipForm(role: string) {
    const membershipRoles = [
      'Welfare Manager',
      'Welfare Accountant',
      'Welfare Secretary',
      'Welfare Client Member',
    ];

    this.displayMembershipForm = membershipRoles.includes(role);
  }

  addChild() {
    this.childrenDetailsFormControls$.push(
      this.membershipService.getChildDetailsFormControls()
    );
    this.validChildren.push(false);
  }

  save() {
    this.isSubmitting$ = true;

    const payload: any = {
      userDto: this.userFormValues,
    };

    if (this.groupFormValues) {
      payload['groupDto'] = this.groupFormValues;
    }

    if (this.spouseFormValues) {
      payload['spouseDto'] = this.spouseFormValues;
    }
    if (this.childrenFormValues) {
      payload['childrenDto'] = this.childrenFormValues;
    }

    if (this.user) {
      this.service
        .updateUser(this.user['id'] as number, payload)
        .pipe(catchError(this.service.errorHandler))
        .subscribe({
          next: ({ id }) => {
            this.isSubmitting$ = false;

            this.router.navigate(['/', 'users', 'view', id]);

            const snackBarRef = this.snackbar.open(
              'User successfully updated. Navigate back to Users List?',
              `Yes`,
              {
                panelClass: `alert-dialog`,
              }
            );

            snackBarRef.onAction().subscribe(() => {
              snackBarRef.dismiss();
              this.router.navigate(['../']);
            });
          },
          error: (err) => {
            this.isSubmitting$ = false;
            console.error('not saved', err);
          },
        });
    } else {
      this.service
        .createUser(payload)
        .pipe(catchError(this.service.errorHandler))
        .subscribe({
          next: ({ id }) => {
            this.isSubmitting$ = false;

            this.router.navigate(['/', 'users', 'view', id]);

            const snackBarRef = this.snackbar.open(
              'User successfully created. Navigate back to Users List?',
              `Yes`,
              {
                panelClass: `alert-dialog`,
              }
            );

            snackBarRef.onAction().subscribe(() => {
              snackBarRef.dismiss();
              this.router.navigate(['../']);
            });
          },
          error: (err) => {
            this.isSubmitting$ = false;
            console.error('not saved', err);
          },
        });
    }
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
