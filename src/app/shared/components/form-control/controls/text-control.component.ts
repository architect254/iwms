import { Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CustomTextboxControl } from '../model';

@Component({
  standalone: true,
  selector: 'iwms-text-control',
  templateUrl: './text-control.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class CustomTextControlComponent {
  @Input() control!: CustomTextboxControl;
  @Input() form!: FormGroup;
}
