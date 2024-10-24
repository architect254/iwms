import { Observable, of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  CustomTextboxControl,
  CustomDropdownControl,
  CustomSearchControl,
} from '../../../shared/components/form-control/model';
import { ValueType } from '../../../shared/components/form-control/control.component';

export function welfareDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomTextboxControl({
      key: 'name',
      label: 'Name',
      value: '',
      placeholder: 'Welfare Name',
      icon: 'badge',
      required: true,
      order: 1,
    }),
    new CustomTextboxControl({
      key: 'phone_number',
      label: 'Phone No.',
      value: '',
      placeholder: '0712345678',
      icon: 'call_log',
      required: true,
      order: 2,
    }),
    new CustomTextboxControl({
      key: 'email',
      label: 'Email',
      value: '',
      placeholder: 'a@a.com',
      icon: 'contact_mail',
      type: 'email',
      required: true,
      order: 3,
    }),
    new CustomSearchControl({
      key: 'chairperson',
      label: 'Chair-Person',
      value: '',
      placeholder: 'John Doe',
      icon: 'manage_accounts',
      required: true,
      order: 4,
    }),

    new CustomSearchControl({
      key: 'treasurer',
      label: 'Treasurer',
      value: '',
      placeholder: 'John Doe',
      icon: 'account_box',
      required: true,
      order: 5,
    }),
    new CustomSearchControl({
      key: 'secretary',
      label: 'Secretary',
      value: '',
      placeholder: 'John Doe',
      icon: 'person_check',
      required: true,
      order: 4,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}

export function chooseWelfareFormControls(): Observable<
  DynamicCustomFormControlBase<ValueType>[]
> {
  return of([
    new CustomDropdownControl({
      key: 'id',
      label: 'Welfare Group',
      options: undefined,
      icon: 'groups',
      required: false,
      order: 1,
      placeholder:
        'There are no Welfare Groups currently. Please create one...',
    }) as DynamicCustomFormControlBase<ValueType>,
  ]);
}
