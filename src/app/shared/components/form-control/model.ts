import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

export function toFormGroup(
  controls: DynamicCustomFormControlBase<ValueType>[]
) {
  const group: any = {};
  controls
    .filter((control) => control.visible)
    ?.forEach((control) => {
      if (control.controlType == 'month') {
        if (control.required) {
          group[control.key] = new FormControl(moment(), {
            validators: [Validators.required],
            updateOn: control.updateOn,
          });
        } else {
          group[control.key] = new FormControl(moment(), {
            updateOn: control.updateOn,
          });
        }
        if (control.value) {
          group[control.key].setValue(control.value);
        }
      } else if (control.required) {
        group[control.key] = new FormControl(control.value || '', {
          validators: [Validators.required],
          updateOn: control.updateOn,
        });
      } else {
        group[control.key] = new FormControl(control.value || '', {
          updateOn: control.updateOn,
        });
      }
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
  updateOn: 'blur' | 'change' = 'change';
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

export class CustomMonthControl extends DynamicCustomFormControlBase<string> {
  override controlType = 'month';
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
    } = {}
  ) {
    super(config);
  }
}

export type ValueType = string | number | Date;

export interface SearchDto {
  term: string;
  page: number;
  take: number;
}
export interface SearchOption {
  id: string;
  name: string;
}
export interface Searchable {
  search(searchDto: SearchDto): Observable<SearchOption[]>;
}
