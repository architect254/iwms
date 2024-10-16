import { of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  CustomTextboxControl,
  CustomDropdownControl,
} from '../../../shared/components/form-control/form.service';
import { Welfare } from '../../welfares/model';

export function welfareDetailsFormControls() {
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
}

export function chooseWelfareFormControls(welfares?: Welfare[]) {
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
}
