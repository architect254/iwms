import { of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomTextboxControl,
  CustomSearchControl,
} from '../../../../../shared/components/form-control/model';
import { WelfaresService } from '../../../welfares/welfares.service';
import { AccountType } from '../../../../../core/entities/account.entity';

export function bankAccountDetailsFormControls() {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomSearchControl({
      key: 'welfareName',
      label: 'Welfare',
      value: '',
      placeholder: 'Example Welfare',
      icon: 'group',
      service: WelfaresService,
      required: true,
      visible: true,
      order: 0,
    }),
    new CustomTextboxControl({
      key: 'name',
      label: 'Bank Account Name',
      value: '',
      placeholder: 'ABC Bank',
      icon: 'badge',
      required: true,
      order: 1,
    }),

    new CustomTextboxControl({
      key: 'number',
      label: 'Bank Account Number',
      value: '',
      placeholder: '34643',
      icon: 'badge',
      required: true,
      order: 2,
    }),

    new CustomTextboxControl({
      key: 'base_amount',
      label: 'Starting Amount',
      type: 'number',
      value: '',
      placeholder: '0',
      icon: 'currency',
      required: true,
      order: 3,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}

export interface BankAccountDto {
  type: AccountType;
  name: string;
  number: string;
  welfareName: string;
  base_amount: string;
}
