import { Observable, of } from 'rxjs';
import {
  DynamicCustomDataBase,
  CustomTextData,
  CustomStatusData,
  CustomDateData,
} from '../../../../shared/components/data-view/view.service';

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
    // new CustomTextData({
    //   key: 'hostname',
    //   label: 'Host Name',
    //   icon: 'web',
    //   order: 4,
    // }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}

export function memberDataView(): Observable<
  DynamicCustomDataBase<string | number | Date>[]
> {
  const data: DynamicCustomDataBase<string | number | Date>[] = [
    new CustomTextData({
      key: 'name',
      label: 'Full Name',
      icon: 'badge',
      order: 1,
    }),
    new CustomStatusData({
      key: 'gender',
      label: 'Gender',
      colors: {
        Male: 'blue',
        Female: 'red',
      },
      icon: 'checklist',
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
  ];
  return of(data.sort((a, b) => a.order - b.order));
}

export function contributionDataView(): Observable<
  DynamicCustomDataBase<string | number | Date>[]
> {
  const data: DynamicCustomDataBase<string | number | Date>[] = [
    new CustomTextData({
      key: 'type',
      label: 'Transaction Type',
      icon: 'badge',
      order: 1,
    }),
    new CustomTextData({
      key: 'transaction.amount',
      label: 'Amount',
      icon: 'badge',
      order: 2,
    }),
    new CustomTextData({
      key: 'from',
      label: 'From Member',
      value: '12345678',
      icon: 'fingerprint',
      order: 3,
    }),
    new CustomDateData({
      key: 'to',
      label: 'To Member',
      icon: 'cake',
      order: 4,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}
