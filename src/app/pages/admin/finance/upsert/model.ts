import { of, Observable } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomTextboxControl,
  CustomDateControl,
  CustomSearchControl,
  CustomMonthControl,
} from '../../../../shared/components/form-control/model';
import { MembersService } from '../../members/members.service';

export function memberContributionDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomTextboxControl({
      key: 'amount',
      label: 'Amount',
      value: '',
      placeholder: '100',
      icon: 'money',
      required: true,
      order: 1,
    }),
    new CustomSearchControl({
      key: 'from',
      label: 'From Member',
      value: '',
      placeholder: 'John Doe',
      icon: 'fingerprint',
      service: MembersService,
      required: true,
      visible: true,
      order: 2,
    }),
    new CustomSearchControl({
      key: 'to',
      label: 'To Member',
      value: '',
      placeholder: 'John Doe',
      icon: 'fingerprint',
      service: MembersService,
      required: true,
      visible: true,
      order: 3,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}
