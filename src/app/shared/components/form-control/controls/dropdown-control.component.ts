import { Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { CustomDropdownControl } from '../model';

@Component({
  standalone: true,
  selector: 'iwms-dropdown-control',
  templateUrl: './dropdown-control.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class CustomDropdownControlComponent {
  @Input() control!: CustomDropdownControl;
  @Input() form!: FormGroup;
}
