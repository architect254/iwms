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
    new CustomSearchControl({
      key: 'member',
      label: 'Member',
      value: '',
      placeholder: 'John Doe',
      icon: 'fingerprint',
      service: MembersService,
      required: true,
      visible: true,
      order: 0,
    }),
    new CustomSearchControl({
      key: 'bereavedMember',
      label: 'Bereaved Member',
      value: '',
      placeholder: 'John Doe',
      icon: 'fingerprint',
      service: MembersService,
      required: true,
      visible: false,
      order: 1,
    }),
    new CustomSearchControl({
      key: 'deceasedMember',
      label: 'Deeceased Member',
      value: '',
      placeholder: 'John Doe',
      icon: 'fingerprint',
      service: MembersService,
      required: true,
      visible: false,
      order: 3,
    }),
    new CustomMonthControl({
      key: 'for_month',
      label: 'For Month',
      value: '',
      placeholder: '07/2024',
      icon: 'cake',
      required: true,
      visible: false,
      order: 4,
    }),
    new CustomTextboxControl({
      key: 'amount',
      label: 'Amount',
      value: '',
      placeholder: '100',
      icon: 'money',
      required: true,
      visible: true,
      order: 5,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}
