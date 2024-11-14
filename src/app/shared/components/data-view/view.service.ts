import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class DynamicCustomDataViewService {
  toFormGroup(controls: DynamicCustomDataBase<string | number | Date>[]) {
    const group: any = {};
    controls?.forEach((control) => {
      group[control.key] = control.type
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
}
export class DynamicCustomDataBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  icon: string;
  order: number;
  dataType: string;
  type: string;
  options?: { label: string; value: string | number }[];
  colors?: { [key: string]: string };
  visible?: boolean = true;
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      icon?: string;
      order?: number;
      dataType?: string;
      type?: string;
      options?: { label: string; value: string | number }[];
      colors?: { [key: string]: string };
      visible?: boolean;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.icon = options.icon || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.dataType = options.dataType || '';
    this.type = options.type || '';
    this.options = options.options || undefined;
    this.colors = options.colors || {};
    this.visible = options.visible || true;
  }
}
export class CustomTextData extends DynamicCustomDataBase<string> {
  override dataType = 'text';
}
export class CustomCurrencyData extends DynamicCustomDataBase<string> {
  override dataType = 'currency';
}
export class CustomDateData extends DynamicCustomDataBase<string> {
  override dataType = 'date';
}
export class CustomMonthData extends DynamicCustomDataBase<string> {
  override dataType = 'month';
}
export class CustomStatusData extends DynamicCustomDataBase<string> {
  override dataType = 'status';
}
export class CustomListData extends DynamicCustomDataBase<string> {
  override dataType = 'list';
}
