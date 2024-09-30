import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Injectable()
export class DynamicCustomFormControlService {
  toFormGroup(controls: DynamicCustomFormControlBase<string>[]) {
    const group: any = {};
    controls.forEach((control) => {
      group[control.key] = control.required
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
}
export class DynamicCustomFormControlBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string; value: string }[];
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[];
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
export class CustomTextboxControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'textbox';
}
export class CustomDropdownControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'dropdown';
}

@Injectable()
export class DynamicCustomFormControlsService {
  toFormGroup(controls: DynamicCustomFormControlBase<string>[]) {
    const group: any = {};
    controls.forEach((control) => {
      group[control.key] = control.required
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
  // TODO: get from a remote source of question metadata
  getControls() {
    const controls: DynamicCustomFormControlBase<string>[] = [
      new CustomDropdownControl({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { key: 'cat', value: 'Cat' },
          { key: 'dog', value: 'Dog' },
          { key: 'horse', value: 'Horse' },
          { key: 'capybara', value: 'Capybara' },
        ],
        order: 3,
      }),
      new CustomTextboxControl({
        key: 'firstName',
        label: 'First name',
        value: 'Alex',
        required: true,
        order: 1,
      }),
      new CustomTextboxControl({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }
}
