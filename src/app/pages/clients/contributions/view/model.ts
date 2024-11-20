import { Observable, of } from 'rxjs';
import {
  DynamicCustomDataBase,
  CustomTextData,
  CustomStatusData,
  CustomDateData,
  CustomMonthData,
  CustomCurrencyData,
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
    new CustomCurrencyData({
      key: 'amount',
      label: 'Amount',
      value: '100',
      icon: 'monthly',
      order: 2,
    }),
    new CustomTextData({
      key: 'member',
      label: 'Member',
      icon: 'badge',
      order: 3,
    }),
    new CustomMonthData({
      key: 'for_month',
      label: 'For Month',
      icon: 'cake',
      order: 4,
    }),
    new CustomTextData({
      key: 'bereavedMember',
      label: 'Bereaved Member',
      icon: 'badge',
      order: 5,
    }),
    new CustomTextData({
      key: 'deceasedMember',
      label: 'Deceased Member',
      icon: 'badge',
      order: 6,
    }),
    new CustomTextData({
      key: 'account',
      label: 'To Account',
      icon: 'badge',
      order: 7,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}
