import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { map, Observable, of, switchMap } from 'rxjs';

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
    group?: string;
  } = {};

  spouseFormValues: {
    first_name?: string;
    last_name?: string;
    id_number?: string;
    birth_date?: Date;
    phone_number?: string;
    email?: string;
  } = {};

  childrenFormValues:
    | {
        first_name?: string;
        last_name?: string;
        birth_date?: Date;
      }[] = [{}];

  displayMembershipForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      (this.displayMembershipForm &&
        this.isProceedAllowed['Spouse Details'] &&
        this.areChildrenValid)
    );
  }

  get areChildrenValid() {
    return this.validChildren.reduce(
      (previusChildrenValid: boolean, currentOffspringValid: boolean) => {
        return currentOffspringValid;
      }
    );
  }

  checkChange(checked: boolean, section: string) {
    this.checks[section] = checked;
    switch (section) {
      case 'Not Married':
        if (checked) {
          this.spouseFormValues = {};
        }

        break;
      case 'No Children':
        if (checked) {
          this.childrenFormValues = [{}];
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
    childDetailsIndex?: number,
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
                if (this.displayMembershipForm && !this.userFormValues.group!) {
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
        this.childrenFormValues[childDetailsIndex!] = { ...data };
        this.validChildren[childDetailsIndex!] = validOffspring;
        break;
      default:
        break;
    }
  }

  addChild() {
    this.validChildren.push(false);
  }

  save() {
    const payload = {
      user: this.userFormValues,
      spouse: this.spouseFormValues,
      children: this.childrenFormValues,
    };
    this.service.createUser(payload).subscribe({
      next: (value) => {
        console.log('saved', value);
        this.router.navigate(['../']);
      },
      error: (err) => {
        console.error('not saved', err);
      },
    });
    console.log(
      'saving',
      this.userFormValues,
      this.spouseFormValues,
      this.childrenFormValues
    );
  }
}
