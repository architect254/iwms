import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CustomDateControl } from '../model';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'iwms-date-control',
  templateUrl: './date-control.component.html',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    AsyncPipe,
  ],
  providers: [MatDatepickerModule, MatDatepicker, provideNativeDateAdapter()],
})
export class CustomDateControlComponent {
  @Input() control!: CustomDateControl;
  @Input() form!: FormGroup;
}
