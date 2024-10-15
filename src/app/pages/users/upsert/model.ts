import { of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  CustomTextboxControl,
  CustomDateControl,
  CustomDropdownControl,
} from '../../../shared/form-control/form.service';
import { Welfare } from '../../welfares/welfare';

export const coreUserDetailsFormControls = () => {
  const controls: DynamicCustomFormControlBase<string>[] = [
    new CustomTextboxControl({
      key: 'first_name',
      label: 'First Name',
      value: '',
      placeholder: 'John',
      icon: 'badge',
      required: true,
      order: 1,
    }),
    new CustomTextboxControl({
      key: 'last_name',
      label: 'Last Name',
      value: '',
      placeholder: 'Doe',
      icon: 'badge',
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
    new CustomDropdownControl({
      key: 'user_role',
      label: 'User Role',
      options: [
        { id: 'Site Admin', name: 'Site Admin' },
        { id: 'Client', name: 'Client' },
      ],
      icon: 'checklist',
      required: true,
      order: 7,
    }),
    new CustomDropdownControl({
      key: 'membership_role',
      label: 'Membership Role',
      options: [
        { id: 'Welfare Manager', name: 'Welfare Manager' },
        { id: 'Welfare Accountant', name: 'Welfare Accountant' },
        { id: 'Welfare Secretary', name: 'Welfare Secretary' },
        { id: 'Welfare Member', name: 'Welfare Member' },
      ],
      icon: 'checklist',
      required: false,
      visible: false,
      order: 8,
    }),
    new CustomDropdownControl({
      key: 'status',
      label: 'Membership Status',
      options: [
        { id: 'Active', name: 'Active' },
        { id: 'InActive', name: 'InActive' },
      ],
      icon: 'checklist',
      required: false,
      visible: false,
      order: 9,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
};
export const newWelfareDetailsFormControls = () => {
  const controls: DynamicCustomFormControlBase<string>[] = [
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
  ];
  return of(controls.sort((a, b) => a.order - b.order));
};
export const welfareDetailsFormControls = (welfares: Welfare[] | undefined) => {
  let controls: DynamicCustomFormControlBase<string>[];
  if (welfares?.length) {
    const welfareOptions = welfares?.map((welfare) => {
      return { id: welfare?.id!, name: welfare?.name! };
    });
    controls = [
      new CustomDropdownControl({
        key: 'id',
        label: 'Welfare Name',
        options: welfareOptions,
        icon: 'groups',
        required: false,
        order: 1,
      }),
    ];
  } else {
    controls = [
      new CustomDropdownControl({
        key: 'id',
        label: 'Welfare Name',
        icon: 'groups',
        required: false,
        order: 1,
        placeholder: 'No Welfares. Please create one...',
      }),
    ];
  }
  return of(controls.sort((a, b) => a.order - b.order));
};
export const spouseDetailsFormControls = () => {
  const controls: DynamicCustomFormControlBase<string>[] = [
    new CustomTextboxControl({
      key: 'first_name',
      label: 'First Name',
      value: '',
      placeholder: 'John',
      icon: 'badge',
      required: true,
      order: 1,
    }),
    new CustomTextboxControl({
      key: 'last_name',
      label: 'Last Name',
      value: '',
      placeholder: 'Doe',
      icon: 'badge',
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
      label: 'Date of Birth',
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
};
export const childDetailsFormControls = () => {
  const controls: DynamicCustomFormControlBase<string>[] = [
    new CustomTextboxControl({
      key: 'first_name',
      label: 'First Name',
      value: '',
      placeholder: 'John',
      icon: 'badge',
      required: true,
      order: 1,
    }),
    new CustomTextboxControl({
      key: 'last_name',
      label: 'Last Name',
      value: '',
      placeholder: 'Doe',
      icon: 'badge',
      required: true,
      order: 2,
    }),
    new CustomDateControl({
      key: 'birth_date',
      label: 'Date of Birth',
      value: '',
      placeholder: '11/07/2000',
      dateConfig: {
        startDate: new Date(2000, 0, 1),
        minDate: new Date(1930, 0, 1),
        maxDate: new Date(Date.now()),
      },
      icon: 'cake',
      required: true,
      order: 3,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
};
