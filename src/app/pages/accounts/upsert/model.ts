import { catchError, map, Observable, of, switchMap } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  CustomTextboxControl,
  CustomDateControl,
  CustomDropdownControl,
} from '../../../shared/components/form-control/model';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { WelfaresService } from '../../welfares/welfares.service';

export function coreUserDetailsFormControls() {
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
      key: 'type',
      label: 'Account Type',
      options: [
        { id: 'Admin', name: 'Admin' },
        { id: 'Client', name: 'Client' },
      ],
      icon: 'checklist',
      required: true,
      order: 7,
    }),
    new CustomDropdownControl({
      key: 'status',
      label: 'Account Status',
      options: [
        { id: 'Active', name: 'Active' },
        { id: 'InActive', name: 'InActive' },
      ],
      icon: 'checklist',
      required: false,
      order: 8,
    }),
    new CustomDropdownControl({
      key: 'role',
      label: 'Member Role',
      options: [
        { id: 'Manager', name: 'Manager' },
        { id: 'Accountant', name: 'Accountant' },
        { id: 'Secretary', name: 'Secretary' },
        { id: 'Member', name: 'Member' },
      ],
      icon: 'checklist',
      required: false,
      visible: false,
      order: 9,
    }),
    new CustomDropdownControl({
      key: 'm_status',
      label: 'Member Status',
      options: [
        { id: 'Normal', name: 'Normal' },
        { id: 'Bereaved', name: 'Bereaved' },
        { id: 'Deceased', name: 'Deceased' },
        { id: 'Deactivated', name: 'Deactivated' },
      ],
      icon: 'checklist',
      required: false,
      visible: false,
      order: 10,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}

export function newWelfareDetailsFormControls() {
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
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}

export function chooseWelfareFormControls(
  service: WelfaresService
): Observable<DynamicCustomFormControlBase<ValueType>[]> {
  return service.getWelfares().pipe(
    map((welfares) => {
      return welfares.map((welfare) => {
        return { id: welfare?.id!, name: welfare?.name! };
      });
    }),
    switchMap((welfareOptions) => {
      return of([
        new CustomDropdownControl({
          key: 'id',
          label: 'Welfare Group',
          options: welfareOptions,
          icon: 'groups',
          required: false,
          order: 1,
        }) as DynamicCustomFormControlBase<ValueType>,
      ]);
    }),
    catchError((error) =>
      of([
        new CustomDropdownControl({
          key: 'id',
          label: 'Welfare Group',
          options: undefined,
          placeholder: 'There are no welfare groups currently. Create one',
          icon: 'groups',
          required: false,
          order: 1,
        }) as DynamicCustomFormControlBase<ValueType>,
      ])
    )
  );
}

export function spouseDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
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
}

export function childDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
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
}
