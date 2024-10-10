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

import { DynamicFormControlComponent, ValueType } from './control.component';
import {
  DynamicCustomFormControlBase,
  DynamicCustomFormControlService,
} from './form.service';
import { filter, Observable, of, Subscription, tap } from 'rxjs';

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
  @Input() controls: DynamicCustomFormControlBase<ValueType>[] | null = [];
  @Input() isSubmitting$: Observable<boolean> = of(false);
  @Input() triggerValidityNotification$: Observable<boolean> = of(false);

  @Output() notifyValidity: EventEmitter<string> = new EventEmitter();

  form!: FormGroup;

  $subscriptions$: Subscription = new Subscription();

  formData = '';

  constructor(private fcs: DynamicCustomFormControlService) {}

  ngOnInit() {
    this.form = this.fcs.toFormGroup(
      this.controls as DynamicCustomFormControlBase<ValueType>[]
    );
    this.$subscriptions$.add(
      this.triggerValidityNotification$.subscribe((doTrigger) => {
        if (doTrigger) {
          this.notify();
        }
      })
    );
    this.$subscriptions$.add(
      this.isSubmitting$.subscribe((isSubmitting) => {
        if (isSubmitting) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      })
    );
    this.$subscriptions$.add(
      this.form.statusChanges
        .pipe(filter((status) => status.valueOf() === 'VALID'))
        .subscribe(() => {
          this.notify();
        })
    );
  }

  notify() {
    this.formData = JSON.stringify(this.form.value);
    this.notifyValidity.emit(this.formData);
  }

  ngOnDestroy(): void {
    if (this.$subscriptions$) {
      this.$subscriptions$.unsubscribe();
    }
  }
}
