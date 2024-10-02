import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { Observable } from 'rxjs';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/form-control/form.component';

import { DynamicCustomFormControlBase } from '../../../shared/form-control/form.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'iwms-upsert',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    DynamicFormComponent,
    MatStepperModule,
    MatButtonModule,
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
    'Personal Details': false,
    'Marital Details': false,
    'Family Details': false,
  };

  formData: { [key: string]: string } = {
    'Personal Details': '',
    'Marital Details': '',
    'Family Details': '',
  };

  constructor(private route: ActivatedRoute, service: AccountsService) {
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });
    this.personalDetailsFormControls$ =
      service.getPersonalDetailsFormControls();
    this.maritalDetailsFormControls$ = service.getPersonalDetailsFormControls();
    this.familyDetailsFormControls$ = service.getPersonalDetailsFormControls();
  }

  onValidityNotified(formData: string, section: string) {
    this.isProceedAllowed[section] = true;
    this.formData[section] = formData;
  }
}
