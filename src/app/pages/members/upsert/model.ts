import { catchError, map, Observable, of, switchMap } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  CustomTextboxControl,
  CustomDropdownControl,
  CustomDateControl,
} from '../../../shared/components/form-control/model';
import { WelfaresService } from '../../welfares/welfares.service';
import { ValueType } from '../../../shared/components/form-control/control.component';

export function memberDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<string>[] = [
    new CustomTextboxControl({
      key: 'name',
      label: 'Full Name',
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
      key: 'status',
      label: 'Account Status',
      options: [
        { id: 'Active', name: 'Active' },
        { id: 'InActive', name: 'InActive' },
      ],
      icon: 'checklist',
      required: false,
      order: 7,
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
      order: 8,
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
