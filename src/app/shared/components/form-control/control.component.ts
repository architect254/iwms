import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DynamicCustomFormControlBase } from './model';
import { CustomTextControlComponent } from './controls/text-control.component';
import { CustomDropdownControlComponent } from './controls/dropdown-control.component';
import { CustomSearchControlComponent } from './controls/search-control.component';
import { CustomDateControlComponent } from './controls/date-control.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'iwms-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    CustomTextControlComponent,
    CustomDropdownControlComponent,
    CustomSearchControlComponent,
    CustomDateControlComponent,
  ],
})
export class DynamicFormControlComponent {
  @Input() control!: any;
  @Input() form!: FormGroup;

  get isNotValid() {
    return (
      (this.form.controls[this.control.key]?.touched ||
        this.form.controls[this.control.key]?.dirty) &&
      !this.form.controls[this.control.key]?.valid
    );
  }
}
export type ValueType = string | number | Date;
