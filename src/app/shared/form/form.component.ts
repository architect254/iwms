import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormControlComponent } from './form-control.component';
import {
  DynamicCustomFormControlBase,
  DynamicCustomFormControlService,
} from './form.service';
import { filter, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'iwms-dynamic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [DynamicCustomFormControlService],
  imports: [
    CommonModule,
    DynamicFormControlComponent,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() controls: DynamicCustomFormControlBase<string>[] | null = [];
  @Output() notifyValidity: EventEmitter<string> = new EventEmitter();

  form!: FormGroup;
  formStatusSubscription!: Subscription;

  formData = '';

  constructor(private qcs: DynamicCustomFormControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(
      this.controls as DynamicCustomFormControlBase<string>[]
    );
    this.formStatusSubscription = this.form.statusChanges
      .pipe(
        filter((status) => status.valueOf() === 'VALID'),
      )
      .subscribe(() => {
        this.notify();
      });
  }

  ngOnDestroy(): void {
    if (this.formStatusSubscription) {
      this.formStatusSubscription.unsubscribe();
    }
  }

  notify() {
    this.formData = JSON.stringify(this.form.getRawValue());
    this.notifyValidity.emit(this.formData);
  }
}
