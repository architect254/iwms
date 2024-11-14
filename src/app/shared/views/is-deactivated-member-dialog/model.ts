import { of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomTextboxControl,
} from '../../components/form-control/model';

export function deactivatedMemberDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomTextboxControl({
      key: 'reason',
      label: 'Reason for Deactivation',
      value: '',
      placeholder: 'He/She ...',
      icon: 'badge',
      required: true,
      order: 1,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}
export interface DeactivatedMemberDto {
  reason: string;
}
