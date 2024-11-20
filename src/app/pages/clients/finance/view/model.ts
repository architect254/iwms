import { Observable, of } from 'rxjs';
import {
  DynamicCustomDataBase,
  CustomTextData,
  CustomStatusData,
  CustomDateData,
} from '../../../../shared/components/data-view/view.service';

export function memberContributionDataView(): Observable<
  DynamicCustomDataBase<string | number | Date>[]
> {
  const data: DynamicCustomDataBase<string | number | Date>[] = [
    new CustomStatusData({
      key: 'type',
      label: 'Contribution Type',
      colors: {
        Membership: 'green',
        Monthly: 'blue',
        Bereaved: 'orange',
        Deceased: 'black',
        'Monthly Re-activation': 'blue',
      },
      icon: 'checklist',
      order: 1,
    }),
    new CustomTextData({
      key: 'amount',
      label: 'Amount',
      value: '100',
      icon: 'monthly',
      order: 2,
    }),
    new CustomTextData({
      key: 'from',
      label: 'From Member',
      icon: 'badge',
      order: 3,
    }),
    new CustomTextData({
      key: 'to',
      label: 'To Member',
      icon: 'badge',
      order: 4,
    }),

  ];
  return of(data.sort((a, b) => a.order - b.order));
}
