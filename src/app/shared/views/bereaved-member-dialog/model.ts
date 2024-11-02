import { of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomTextboxControl,
  CustomDropdownControl,
  CustomDateControl,
} from '../../components/form-control/model';

export function bereavedMemberDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomTextboxControl({
      key: 'deceased',
      label: 'Name of Deceased',
      value: '',
      placeholder: 'John Doe',
      icon: 'badge',
      required: true,
      order: 1,
    }),
    new CustomDropdownControl({
      key: 'relationship_with_deceased',
      label: 'Relationship with Deceased',
      options: [
        { id: 'Father', name: 'Father' },
        { id: 'Mother', name: 'Mother' },
        { id: 'Brother', name: 'Brother' },
        { id: 'Sister', name: 'Sister' },
        { id: 'Son', name: 'Son' },
        { id: 'Daughter', name: 'Daughter' },
        { id: 'GrandMa', name: 'GrandMa' },
        { id: 'GrandPa', name: 'GrandPa' },
        { id: 'Uncle', name: 'Uncle' },
        { id: 'Aunt', name: 'Aunt' },
        { id: 'Nephew', name: 'Nephew' },
        { id: 'Niece', name: 'Niece' },
        { id: 'Cousin', name: 'Cousin' },
      ],
      icon: 'person',
      required: true,
      order: 2,
    }),
    new CustomDateControl({
      key: 'bereavement_date',
      label: 'Date of Demise',
      value: new Date(Date.now()).toLocaleDateString(),
      placeholder: '11/07/2000',
      dateConfig: {
        startDate: new Date(2024, 0, 1),
        minDate: new Date(2024, 0, 1),
        maxDate: new Date(Date.now()),
      },
      icon: 'cake',
      required: true,
      order: 3,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}
