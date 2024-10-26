import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';

export function toFormGroup(
  controls: DynamicCustomFormControlBase<ValueType>[]
) {
  const group: any = {};
  controls?.forEach((control) => {
    console.log('control', control);

    if (control.key == 'id') {
      console.log('control', control);
    }
    group[control.key] = control.required
      ? new FormControl(control.value || '', {
          validators: [Validators.required],
          updateOn: control.updateOn,
        })
      : new FormControl(control.value || '', { updateOn: control.updateOn });
  });
  return new FormGroup(group);
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
  updateOn: 'blur' | 'change';
  constructor(
    config: {
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
      updateOn?: 'blur' | 'change';
    } = {}
  ) {
    this.value = config.value;
    this.placeholder = config.placeholder || '';
    this.key = config.key || '';
    this.label = config.label || '';
    this.icon = config.icon || '';
    this.required = !!config.required;
    this.visible = config.visible ?? true;
    this.order = config.order === undefined ? 1 : config.order;
    this.controlType = config.controlType || '';
    this.type = config.type || '';
    this.updateOn = config.updateOn || 'blur';
  }
}

export class CustomTextboxControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'text';
}

export class CustomDropdownControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'dropdown';
  public options?: { id: string; name: string }[];
  constructor(
    config: {
      value?: string;
      placeholder?: string;
      key?: string;
      label?: string;
      icon?: string;
      required?: boolean;
      visible?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { id: string; name: string }[];
    } = {}
  ) {
    super(config);
    this.options = config.options || [];
  }
}

export class CustomSearchControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'search';
  override updateOn: 'blur' | 'change' = 'change';
  service: ProviderToken<Searchable>;
  constructor(config: {
    value?: string;
    placeholder?: string;
    key?: string;
    label?: string;
    icon?: string;
    required?: boolean;
    visible?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    service: ProviderToken<Searchable>;
  }) {
    super(config);
    this.service = config.service;
  }
}

export class CustomDateControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'date';
  dateConfig: { minDate: Date; maxDate: Date; startDate: Date };
  constructor(
    config: {
      value?: string;
      placeholder?: string;
      key?: string;
      label?: string;
      icon?: string;
      required?: boolean;
      visible?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      dateConfig?: { minDate: Date; maxDate: Date; startDate: Date };
    } = {}
  ) {
    super(config);
    this.dateConfig = config.dateConfig!;
  }
}

export type ValueType = string | number | Date;

export interface SearchDto {
  term: string;
  skip: number;
  take: number;
}
export interface SearchOption {
  id: string;
  name: string;
}
export interface Searchable {
  search(searchDto: SearchDto): Observable<SearchOption[]>;
}
