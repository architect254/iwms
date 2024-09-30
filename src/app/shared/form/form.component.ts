import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormControlComponent } from './form-control.component';
import {
  DynamicCustomFormControlBase,
  DynamicCustomFormControlsService,
} from './form.service';

@Component({
  standalone: true,
  selector: 'iwms-dynamic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [DynamicCustomFormControlsService],
  imports: [
    CommonModule,
    DynamicFormControlComponent,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input() controls: DynamicCustomFormControlBase<string>[] | null = [];

  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: DynamicCustomFormControlsService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(
      this.controls as DynamicCustomFormControlBase<string>[]
    );
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
