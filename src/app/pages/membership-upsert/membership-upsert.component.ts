import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { DynamicFormComponent } from '../../shared/form/form.component';

import {
  DynamicCustomFormControlBase,
  DynamicCustomFormControlsService,
} from '../../shared/form/form.service';

@Component({
  selector: 'iwms-upsert-membership',
  standalone: true,
  imports: [AsyncPipe, DynamicFormComponent],
  providers: [DynamicCustomFormControlsService],
  templateUrl: './membership-upsert.component.html',
  styleUrl: './membership-upsert.component.scss',
})
export class MembershipUpsertComponent {
  controls$: Observable<DynamicCustomFormControlBase<any>[]>;

  constructor(service: DynamicCustomFormControlsService) {
    this.controls$ = service.getControls();
  }
}
