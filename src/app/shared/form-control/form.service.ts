import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ValueType } from './control.component';

@Injectable()
export class DynamicCustomFormControlService {
  toFormGroup(controls: DynamicCustomFormControlBase<ValueType>[]) {
    const group: any = {};
    controls?.forEach((control) => {
      group[control.key] = control.required
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
}
export class DynamicCustomFormControlBase<T> {
  value: T | undefined;
  placeholder: string | undefined;
  key: string;
  label: string;
  icon: string;
  required: boolean;
  visible: boolean = true;
  order: number;
  controlType: string;
  type: string;
  options: { id: string | number; name: string }[];
  dateConfig?: { minDate: Date; maxDate: Date; startDate: Date };
  constructor(
    options: {
      value?: T;
      placeholder?: string;
      key?: string;
      label?: string;
      icon?: string;
      required?: boolean;
      visible?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { id: string | number; name: string }[];
      dateConfig?: { minDate: Date; maxDate: Date; startDate: Date };
    } = {}
  ) {
    this.value = options.value;
    this.placeholder = options.placeholder || '';
    this.key = options.key || '';
    this.label = options.label || '';
    this.icon = options.icon || '';
    this.required = !!options.required;
    this.visible = options.visible ?? true;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.dateConfig = options.dateConfig;
  }
}
export class CustomTextboxControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'textbox';
}
export class CustomDropdownControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'dropdown';
}
export class CustomDateControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'date';
}
