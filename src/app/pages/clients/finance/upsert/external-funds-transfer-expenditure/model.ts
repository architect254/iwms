import { of } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  ValueType,
  CustomTextboxControl,
  CustomSearchControl,
} from '../../../../../shared/components/form-control/model';
import { WelfaresService } from '../../../welfares/welfares.service';
import { AccountType } from '../../../../../core/entities/account.entity';
import { FinanceService } from '../../finance.service';
import { ExpenditureType } from '../../../../../core/entities/expenditure.entity';

export function externalFundsTransferExpenditureDetailsFormControls() {
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
    new CustomSearchControl({
      key: 'fromAccountName',
      label: 'From Account',
      value: '',
      placeholder: 'Example Account',
      icon: 'money',
      service: FinanceService,
      required: true,
      visible: true,
      order: 1,
    }),
    new CustomTextboxControl({
      key: 'toAccount',
      label: 'To Account',
      value: '',
      placeholder: 'Example Account',
      icon: 'money',
      required: true,
      visible: true,
      order: 2,
    }),
    new CustomTextboxControl({
      key: 'amount',
      label: 'Expenditure Amount',
      type: 'number',
      value: '',
      placeholder: '0',
      icon: 'currency',
      required: true,
      order: 4,
    }),
    new CustomTextboxControl({
      key: 'for',
      label: 'Expenditure For',
      value: '',
      placeholder: 'Example reason',
      icon: 'badge',
      required: true,
      order: 3,
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}

export interface ExternalFundsTransferExpenditureDto {
  type: ExpenditureType;
  welfareName: string;
  fromAccountName: string;
  amount: string;
  for: string;
}
