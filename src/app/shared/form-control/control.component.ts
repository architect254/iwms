import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { DynamicCustomFormControlBase } from './form.service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'iwms-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  providers: [MatDatepickerModule,MatDatepicker],
})
export class DynamicFormControlComponent {
  @Input() control!: DynamicCustomFormControlBase<ValueType>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.control.key].valid;
  }
}
export type ValueType = string | number | Date;
