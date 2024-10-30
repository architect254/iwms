import { of, Observable } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomTextboxControl,
  CustomSearchControl,
  CustomDropdownControl,
} from '../../../../shared/components/form-control/model';
import { MembersService } from '../../members/members.service';

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
    new CustomTextboxControl({
      key: 'hostname',
      label: 'Hostname',
      value: window.location.hostname,
      placeholder: 'site.com',
      icon: 'web',
      type: 'url',
      required: true,
      order: 3,
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
