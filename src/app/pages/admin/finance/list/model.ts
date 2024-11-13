import { AccountType } from '../../../../core/entities/account.entity';
import { Admin } from '../../../../core/entities/admin.entity';
import { BereavedMember } from '../../../../core/entities/bereaved-member.entity';
import {
  Contribution,
  ContributionType,
} from '../../../../core/entities/contribution.entity';
import { DeactivatedMember } from '../../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../../core/entities/deceased-member.entity';
import { ExpenditureType } from '../../../../core/entities/expenditure.entity';
import { Member } from '../../../../core/entities/member.entity';
import { User, Membership } from '../../../../core/entities/user.entity';
import { ToggleOption } from '../../../../shared/components/button-toggle/button-toggle.component';
import {
  FilterOption,
  GridColumn,
  StatusLabels,
  StatusColors,
  ActionConfig,
} from '../../../../shared/views/grid/model';

export const financesToggleOptions: ToggleOption[] = [
  {
    name: 'Accounts',
    value: 'accounts',
    position: 0,
  },
  {
    name: 'Expenditures',
    value: 'expenditures',
    position: 1,
  },
];

export const accountsToggleOptions: ToggleOption[] = [
  {
    name: 'Bank Accounts',
    value: AccountType.Bank,
    position: 0,
  },
  {
    name: 'Petty Cash Accounts',
    value: AccountType.PettyCash,
    position: 1,
  },
];

export const expenditureToggleOptions: ToggleOption[] = [
  {
    name: 'Internal Funds Transfer Expenditures',
    value: ExpenditureType.InternalFundsTransfer,
    position: 0,
  },
  {
    name: 'External Funds Transfer Expenditures',
    value: ExpenditureType.ExternalFundsTransfer,
    position: 1,
  },
];

export const financeFilters: FilterOption[] = [
  {
    key: 'type',
    label: 'Finance Type',
    position: 1,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
];

const accountColumns: GridColumn[] = [
  {
    key: 'select',
    label: 'Select',
    position: 0,
    type: 'select',
    width: '250px',
  },
  {
    key: 'name',
    label: 'Account Name',
    position: 1,
    type: 'string',
    width: '250px',
  },
  {
    key: 'type',
    label: 'Account Type',
    position: 3,
    type: 'status',
    width: '250px',
  },
  {
    key: 'current_amount',
    label: 'Total Amount Currently',
    position: 4,
    type: 'currency',
    width: '250px',
  },
  {
    key: 'base_amount',
    label: 'Total Starting Amount',
    position: 5,
    type: 'currency',
    width: '250px',
  },
  {
    key: 'welfare',
    label: 'Welfare Name',
    position: 6,
    type: 'string',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'First Created',
    position: 99,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Last Updated',
    position: 100,
    type: 'date',
    width: '250px',
  },
];

export const bankAccountColumns: GridColumn[] = [
  ...accountColumns,
  {
    key: 'number',
    label: 'Account Number',
    position: 2,
    type: 'string',
    width: '250px',
  },
];

export const pettyCashAccountColumns: GridColumn[] = [...accountColumns];

const expenditureColumns: GridColumn[] = [
  {
    key: 'select',
    label: 'Select',
    position: 0,
    type: 'select',
    width: '250px',
  },
  {
    key: 'type',
    label: 'Expenditure Type',
    position: 1,
    type: 'status',
    width: '250px',
  },
  {
    key: 'from',
    label: 'From Account',
    position: 2,
    type: 'string',
    width: '250px',
  },
  {
    key: 'amount',
    label: 'Total Amount',
    position: 4,
    type: 'currency',
    width: '250px',
  },
  {
    key: 'for',
    label: 'Expenditure For',
    position: 5,
    type: 'string',
    width: '250px',
  },
  {
    key: 'welfare',
    label: 'Welfare Name',
    position: 6,
    type: 'string',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'First Created',
    position: 99,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Last Updated',
    position: 100,
    type: 'date',
    width: '250px',
  },
];

export const internalFundsTransferExpenditureColumns: GridColumn[] = [
  ...expenditureColumns,
  {
    key: 'to',
    label: 'To Account',
    position: 3,
    type: 'string',
    width: '250px',
  },
];

export const externalFundsTransferExpenditureColumns: GridColumn[] = [
  ...expenditureColumns,
  {
    key: 'to',
    label: 'To',
    position: 3,
    type: 'string',
    width: '250px',
  },
];

export function sort(array: GridColumn[]) {
  return array.sort((a, b) => a.position - b.position);
}

export function getActionConfig(entity: any) {
  const activeMemberActions = [
    {
      entity,
      position: 0,
      key: 'is_bereaved',
      label: 'Is Bereaved',
      icon: 'badge',
    },
  ];

  let actions;

  switch (entity.type) {
    case ContributionType.Membership:
      actions = activeMemberActions;
      break;
  }
  let actionConfig;
  actionConfig = {
    actions: [
      {
        entity,
        position: 0,
        key: 'change_status',
        label: 'Change Status',
        icon: 'edit',
        actions,
      },
    ],
  } as ActionConfig;
  return actionConfig;
}

export const statusLabels: StatusLabels = {
  [AccountType.Bank]: AccountType.Bank,
  [AccountType.PettyCash]: AccountType.PettyCash,
};

export const statusColors: StatusColors = {
  [AccountType.Bank]: 'green',
  [AccountType.PettyCash]: 'blue',
};
export interface FilterRequest {
  name?: string;
  id_number?: string;
  birth_date?: Date;
  phone_number?: string;
  email?: string;
  class?: string;
  state?: string;
  role?: string;
  status?: string;
  groupId?: number;
}
