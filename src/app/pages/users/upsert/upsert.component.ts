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
export class UpsertComponent {
  pageTitle: string = '';

  personalDetailsFormControls$: Observable<DynamicCustomFormControlBase<any>[]>;
  maritalDetailsFormControls$: Observable<DynamicCustomFormControlBase<any>[]>;
  familyDetailsFormControls$: Observable<DynamicCustomFormControlBase<any>[]>;

  isProceedAllowed: { [key: string]: boolean } = {
    'User Details': false,
    'Spouse Details': false,
  };

  checks: { [key: string]: boolean } = {
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

  displayMembershipForm: boolean = false;

  isSubmitting = new BehaviorSubject(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private service: UsersService,
    private membershipService: MembershipsService
  ) {
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });

    this.personalDetailsFormControls$ =
      this.service.getUserDetailsFormControls();
    this.maritalDetailsFormControls$ =
      this.membershipService.getSpouseDetailsFormControls();
    this.familyDetailsFormControls$ =
      this.membershipService.getFamilyDetailsFormControls();
  }

  get isSaveAllowed() {
    return (
      (this.isProceedAllowed['User Details'] && !this.displayMembershipForm) ||
      (this.displayMembershipForm && this.isProceedAllowed['Spouse Details']) ||
      this.areChildrenValid
    );
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

  checkChange(checked: boolean, section: string) {
    this.checks[section] = checked;
    switch (section) {
      case 'Not Married':
        if (checked) {
          this.spouseFormValues = null;
        }

        break;
      case 'No Children':
        if (checked) {
          this.childrenFormValues = null;
          this.validChildren = [false];
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
      case 'User Details':
        this.userFormValues = { ...data };
        this.isProceedAllowed['User Details'] = true;

        const membershipRoles = [
          'Welfare Manager',
          'Welfare Accountant',
          'Welfare Secretary',
          'Welfare Client Member',
        ];

        this.displayMembershipForm = membershipRoles.includes(
          this.userFormValues.role!
        );

        if (!this.displayMembershipForm) {
          this.checkChange(true, 'Not Married');
          this.checkChange(true, 'No Children');
        }

        this.personalDetailsFormControls$.forEach(
          (controls: DynamicCustomFormControlBase<any>[]) => {
            controls.forEach((control) => {
              if (control.key == 'group') {
                control.visible = this.displayMembershipForm;
                control.required = this.displayMembershipForm;
                if (
                  this.displayMembershipForm &&
                  !this.userFormValues.group_id!
                ) {
                  this.isProceedAllowed['User Details'] = false;
                }
              }
            });
          }
        );

        break;

      case 'Spouse Details':
        this.spouseFormValues = { ...data };
        this.isProceedAllowed['Spouse Details'] = true;
        break;
      case 'Family Details':
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

  addChild() {
    this.childrenFormValues?.push({
      first_name: '',
      last_name: '',
      birth_date: new Date(),
    });
    this.validChildren.push(false);
  }

  save() {
    this.isSubmitting$ = true;

    const payload: any = {
      userDto: this.userFormValues,
    };

    if (this.spouseFormValues) {
      payload['spouseDto'] = this.spouseFormValues;
    }
    if (this.childrenFormValues) {
      payload['childrenDto'] = this.childrenFormValues;
    }

    this.service
      .createUser(payload)
      .pipe(catchError(this.service.errorHandler))
      .subscribe({
        next: (value) => {
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
