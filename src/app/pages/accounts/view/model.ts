import { Observable, of } from 'rxjs';
import {
  DynamicCustomDataBase,
  CustomTextData,
  CustomDateData,
  CustomStatusData,
} from '../../../shared/components/data-view/view.service';

export function accountDataView(): Observable<
  DynamicCustomDataBase<string | number | Date>[]
> {
  const data: DynamicCustomDataBase<string | number | Date>[] = [
    new CustomTextData({
      key: 'first_name',
      label: 'First name',
      icon: 'badge',
      order: 1,
    }),
    new CustomTextData({
      key: 'last_name',
      label: 'Last Name',
      icon: 'badge',
      order: 2,
    }),
    new CustomTextData({
      key: 'id_number',
      label: 'National ID No.',
      value: '12345678',
      icon: 'fingerprint',
      order: 3,
    }),
    new CustomDateData({
      key: 'birth_date',
      label: 'Date of Birth',
      icon: 'cake',
      order: 4,
    }),
    new CustomTextData({
      key: 'phone_number',
      label: 'Phone No.',
      icon: 'call_log',
      order: 5,
    }),
    new CustomTextData({
      key: 'email',
      label: 'Email',
      icon: 'contact_mail',
      type: 'email',
      order: 6,
    }),
    new CustomStatusData({
      key: 'type',
      label: 'Account Type',
      colors: {
        Admin: 'red',
        Client: 'green',
      },
      icon: 'checklist',
      order: 7,
    }),
    new CustomStatusData({
      key: 'role',
      label: 'Member Role',
      colors: {
        Manager: 'orange',
        Accountant: 'blue',
        Secretary: 'purple',
        Member: 'cyan',
      },
      icon: 'checklist',
      order: 8,
    }),
    new CustomStatusData({
      key: 'status',
      label: 'Account Status',
      colors: {
        Active: 'green',
        InActive: 'black',
      },
      icon: 'checklist',
      order: 9,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}

export function welfareDataView(): Observable<
  DynamicCustomDataBase<string | number | Date>[]
> {
  const data: DynamicCustomDataBase<string>[] = [
    new CustomTextData({
      key: 'name',
      label: 'Name',
      icon: 'badge',
      order: 1,
    }),
    new CustomTextData({
      key: 'phone_number',
      label: 'Phone No.',
      icon: 'call_log',
      order: 2,
    }),
    new CustomTextData({
      key: 'email',
      label: 'Email',
      icon: 'email',
      order: 3,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}

export function spouseDataView(): Observable<
  DynamicCustomDataBase<string | number | Date>[]
> {
  const data: DynamicCustomDataBase<string | number | Date>[] = [
    new CustomTextData({
      key: 'first_name',
      label: 'First name',
      icon: 'badge',
      order: 1,
    }),
    new CustomTextData({
      key: 'last_name',
      label: 'Last Name',
      icon: 'badge',
      order: 2,
    }),
    new CustomTextData({
      key: 'id_number',
      label: 'National ID No.',
      icon: 'fingerprint',
      order: 3,
    }),
    new CustomDateData({
      key: 'birth_date',
      label: 'Date of Birth',
      icon: 'cake',
      order: 4,
    }),
    new CustomTextData({
      key: 'phone_number',
      label: 'Phone No.',
      icon: 'call_log',
      order: 5,
    }),
    new CustomTextData({
      key: 'email',
      label: 'Email',
      icon: 'contact_mail',
      type: 'email',
      order: 6,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}

export function childDataView(): Observable<DynamicCustomDataBase<string>[]> {
  const data: DynamicCustomDataBase<string>[] = [
    new CustomTextData({
      key: 'first_name',
      label: 'First name',
      icon: 'badge',
      order: 1,
    }),
    new CustomTextData({
      key: 'last_name',
      label: 'Last Name',
      icon: 'badge',
      order: 2,
    }),
    new CustomDateData({
      key: 'birth_date',
      label: 'Date of Birth',
      icon: 'cake',
      order: 3,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}
