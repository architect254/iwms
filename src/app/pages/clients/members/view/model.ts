import { Observable, of } from 'rxjs';
import {
  DynamicCustomDataBase,
  CustomTextData,
  CustomStatusData,
  CustomDateData,
} from '../../../../shared/components/data-view/view.service';
import { ContributionType } from '../../../../core/entities/contribution.entity';

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
    new CustomStatusData({
      key: 'membership',
      label: 'Membership Type/Status',
      colors: {
        Active: 'green',
        Bereaved: 'orange',
        Deceased: 'red',
        Deactivated: 'grey',
      },
      icon: 'checklist',
      order: 7,
    }),
    new CustomTextData({
      key: 'deceased',
      label: 'Deceased Name',
      icon: 'badge',
      order: 8,
    }),
    new CustomStatusData({
      key: 'relationship_with_deceased',
      label: 'Relationship With Deceased',
      colors: {
        Father: 'blue',
        Mother: 'purple',
        Brother: 'violet',
        Sister: 'indigo',
        Son: 'teal',
        Daughter: 'bisque',
        GrandMa: 'burlywood',
        GrandPa: 'coral',
        Uncle: 'darkcyan',
        Aunt: 'darkorchid',
        Nephew: 'dodgerblue',
        Niece: 'hotpink',
        Cousin: 'salmon',
      },
      icon: 'checklist',
      order: 9,
    }),
    new CustomDateData({
      key: 'bereavement_date',
      label: 'Date of Bereavement',
      icon: 'person',
      order: 10,
    }),
    new CustomDateData({
      key: 'demise_date',
      label: 'Date of Demise',
      icon: 'person',
      order: 11,
    }),
    new CustomDateData({
      key: 'deactivation_date',
      label: 'Date of Deactivation',
      icon: 'person',
      order: 12,
    }),
    new CustomTextData({
      key: 'reason',
      label: 'Reason for Deactivation',
      icon: 'badge',
      order: 13,
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
      key: 'name',
      label: 'Full name',
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
      key: 'name',
      label: 'Full name',
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
    new CustomDateData({
      key: 'birth_date',
      label: 'Date of Birth',
      icon: 'cake',
      order: 3,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}

export function memberContributionDataView(): Observable<
  DynamicCustomDataBase<string>[]
> {
  const data: DynamicCustomDataBase<string>[] = [
    new CustomStatusData({
      key: 'type',
      label: 'Transaction Type',
      colors: {
        [ContributionType.Membership]: 'green',
        [ContributionType.Monthly]: 'blue',
        [ContributionType.BereavedMember]: 'red',
        [ContributionType.DeceasedMember]: 'black',
        [ContributionType.MembershipReactivation]: 'orange',
      },
      icon: 'checklist',
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
      label: 'From',
      icon: 'badge',
      order: 3,
    }),
    new CustomTextData({
      key: 'to',
      label: 'To',
      icon: 'badge',
      order: 4,
    }),
    new CustomDateData({
      key: 'create_date',
      label: 'Date of Contribution',
      icon: 'cake',
      order: 5,
    }),
  ];
  return of(data.sort((a, b) => a.order - b.order));
}
