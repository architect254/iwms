import { of } from "rxjs";
import { DynamicCustomFormControlBase, ValueType, CustomTextboxControl, CustomDropdownControl, CustomDateControl } from "../../../../shared/components/form-control/model";

export function adminUserDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomTextboxControl({
      key: 'name',
      label: 'Full Name',
      value: '',
      placeholder: 'John Doe',
      icon: 'badge',
      required: true,
      order: 1,
    }),
    new CustomDropdownControl({
      key: 'gender',
      label: 'Gender',
      options: [
        { id: 'Male', name: 'Male' },
        { id: 'Female', name: 'Female' },
      ],
      icon: 'person',
      required: true,
      order: 2,
    }),
    new CustomTextboxControl({
      key: 'id_number',
      label: 'National ID No.',
      value: '',
      placeholder: '12345678',
      icon: 'fingerprint',
      required: true,
      order: 3,
    }),
    new CustomDateControl({
      key: 'birth_date',
      label: 'Birth Date',
      value: '',
      placeholder: '11/07/2000',
      dateConfig: {
        startDate: new Date(2000, 0, 1),
        minDate: new Date(1930, 0, 1),
        maxDate: new Date(Date.now()),
      },
      icon: 'cake',
      required: true,
      order: 4,
    }),
    new CustomTextboxControl({
      key: 'phone_number',
      label: 'Phone No.',
      value: '',
      placeholder: '0712345678',
      icon: 'call_log',
      required: true,
      order: 5,
    }),
    new CustomTextboxControl({
      key: 'email',
      label: 'Email',
      value: '',
      placeholder: 'a@a.com',
      icon: 'contact_mail',
      type: 'email',
      required: true,
      order: 6,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}