import { of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomTextboxControl,
  CustomDropdownControl,
  CustomDateControl,
} from '../../components/form-control/model';

export function deceasedMemberDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomDateControl({
      key: 'demise_date',
      label: 'Date of Demise',
      value: new Date(Date.now()).toLocaleDateString(),
      placeholder: '11/07/2000',
      dateConfig: {
        startDate: new Date(2024, 0, 1),
        minDate: new Date(2024, 0, 1),
        maxDate: new Date(Date.now()),
      },
      icon: 'cake',
      required: true,
      order: 3,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}
export interface DeceasedMemberDto {
  demise_date: string;
}
