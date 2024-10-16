import { Observable, of } from 'rxjs';
import {
  DynamicCustomDataBase,
  CustomTextData,
} from '../../../shared/components/data-view/view.service';

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
    new CustomTextData({
      key: 'manager',
      label: 'Manager',
      icon: 'badge',
      order: 4,
    }),
    new CustomTextData({
      key: 'accountant',
      label: 'Accountant',
      icon: 'badge',
      order: 5,
    }),
    new CustomTextData({
      key: 'secretary',
      label: 'Secretary',
      icon: 'badge',
      order: 5,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}
