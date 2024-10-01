import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { Observable } from 'rxjs';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/form/form.component';

import { DynamicCustomFormControlBase } from '../../../shared/form/form.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MembershipsService } from '../memberships.service';

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

  constructor(private route: ActivatedRoute, service: MembershipsService) {
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });
    this.personalDetailsFormControls$ =
      service.getPersonalDetailsFormControls();
    this.maritalDetailsFormControls$ = service.getPersonalDetailsFormControls();
    this.familyDetailsFormControls$ = service.getPersonalDetailsFormControls();
  }

  onValidityNotified(formData: string, section: string) {
    console.log(section, formData);
  }
}
