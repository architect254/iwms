import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { DynamicCustomFormControlBase } from './form.service';

@Component({
  standalone: true,
  selector: 'iwms-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class DynamicFormControlComponent {
  @Input() control!: DynamicCustomFormControlBase<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.control.key].valid;
  }
}
