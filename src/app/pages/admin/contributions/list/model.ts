import { Admin } from '../../../../core/entities/admin.entity';
import { BereavedMember } from '../../../../core/entities/bereaved-member.entity';
import {
  Contribution,
  ContributionType,
} from '../../../../core/entities/contribution.entity';
import { DeactivatedMember } from '../../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../../core/entities/deceased-member.entity';
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

const contributionToggleOptions: ToggleOption[] = [
  {
    name: 'All',
    value: '',
    position: 0,
  },
  {
    name: 'Membership',
    value: ContributionType.Membership,
    position: 1,
  },
  {
    name: 'Monthly',
    value: ContributionType.Monthly,
    position: 2,
  },
  {
    name: 'Bereaved',
    value: ContributionType.BereavedMember,
    position: 3,
  },
  {
    name: 'Deceased',
    value: ContributionType.DeceasedMember,
    position: 3,
  },
  {
    name: 'Reactivation',
    value: ContributionType.MembershipReactivation,
    position: 3,
  },
];

export const adminToggleOptions: ToggleOption[] = [
  ...contributionToggleOptions,
];

const userFilters: FilterOption[] = [
  {
    key: 'type',
    label: 'Contribution Type',
    position: 1,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
  {
    key: 'gender',
    label: 'Gender',
    position: 2,
    type: 'list',
    icon: 'badge',
    combinator: 'Is',
    options: [
      { key: 'Male', value: 'Male' },
      { key: 'Female', value: 'Female' },
    ],
  },
  {
    key: 'id_number',
    label: 'ID No.',
    position: 3,
    type: 'number',
    icon: 'fingerprint',
    combinator: 'Is',
  },
  {
    key: 'birth_date',
    label: 'Date of Birth',
    position: 4,
    type: 'date',
    icon: 'cake',
    combinator: 'Is',
  },
  {
    key: 'phone_number',
    label: 'Phone No.',
    position: 5,
    type: 'number',
    icon: 'call_log',
    combinator: 'Is',
  },
  {
    key: 'email',
    label: 'Email',
    position: 6,
    type: 'string',
    icon: 'email',
    combinator: 'Includes',
  },
  {
    key: 'membership',
    label: 'Membership Type/Status',
    position: 7,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'Admin', value: 'Admin' },
      { key: 'Active', value: 'Active' },
      { key: 'Bereaved', value: 'Bereaved' },
      { key: 'Deceased', value: 'Deceased' },
      { key: 'DeActivated', value: 'DeActivated' },
    ],
  },
];

export const membersFilters: FilterOption[] = [
  ...userFilters,
  {
    key: 'role',
    label: 'Role',
    position: 6,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'ChairPerson', value: 'ChairPerson' },
      { key: 'Treasurer', value: 'Treasurer' },
      { key: 'Secretary', value: 'Secretary' },
      { key: 'Member', value: 'Member' },
    ],
  },
];

const bereavedMembersFilters: FilterOption[] = [
  ...membersFilters,
  {
    key: 'bereavement_date',
    label: 'Date of Bereavment',
    position: 6,
    type: 'date',
    icon: 'cake',
    combinator: 'Is',
  },
  {
    key: 'deceased_name',
    label: 'Name of Deceased',
    position: 7,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
  {
    key: 'deceased_relationship',
    label: 'Relationship with Deceased',
    position: 8,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'Father', value: 'Father' },
      { key: 'Mother', value: 'Mother' },
      { key: 'Brother', value: 'Brother' },
      { key: 'Sister', value: 'Sister' },
      { key: 'Son', value: 'Son' },
      { key: 'Daughter', value: 'Daughter' },
      { key: 'GrandMa', value: 'GrandMa' },
      { key: 'GrandPa', value: 'GrandPa' },
      { key: 'Uncle', value: 'Uncle' },
      { key: 'Aunt', value: 'Aunt' },
      { key: 'Nephew', value: 'Nephew' },
      { key: 'Niece', value: 'Niece' },
      { key: 'Cousin', value: 'Cousin' },
    ],
  },
];

const deceasedMembersFilters: FilterOption[] = [
  ...membersFilters,
  {
    key: 'demise_date',
    label: 'Date of Demise',
    position: 6,
    type: 'date',
    icon: 'cake',
    combinator: 'Is',
  },
];

const deactivatedMembersFilters: FilterOption[] = [
  ...membersFilters,
  {
    key: 'deactvation_date',
    label: 'Date of Deactivation',
    position: 6,
    type: 'date',
    icon: 'cake',
    combinator: 'Is',
  },
  {
    key: 'reason',
    label: 'Reason for Deactivation',
    position: 7,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
];

export const getFilterOptions = (user: User) => {
  switch (user.membership) {
    case Membership.Active:
      return membersFilters;

    case Membership.Bereaved:
      return bereavedMembersFilters;

    case Membership.Deceased:
      return deceasedMembersFilters;

    case Membership.Deactivated:
      return deactivatedMembersFilters;

    default:
      return userFilters;
  }
};

export const contributionColumns: GridColumn[] = [
  {
    key: 'select',
    label: 'Select',
    position: -1,
    type: 'select',
    width: '250px',
  },
  {
    key: 'id',
    label: 'ID',
    position: 0,
    type: 'string',
    width: '250px',
  },
  {
    key: 'type',
    label: 'Contribution Type',
    position: 1,
    type: 'status',
    width: '250px',
  },
  {
    key: 'from',
    label: 'From Member',
    position: 2,
    type: 'string',
    width: '250px',
  },
  {
    key: 'to',
    label: 'To Member',
    position: 3,
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

export const membershipContributionColumns: GridColumn[] = [
  ...contributionColumns,
];

export const monthlyContributionColumns: GridColumn[] = [
  ...contributionColumns,
  {
    key: 'month',
    label: 'For Month',
    position: 5,
    type: 'date',
    width: '250px',
  },
];

export const bereavedMemberContributionColumns: GridColumn[] = [
  ...contributionColumns,
];

export const deceasedMemberContributionColumns: GridColumn[] = [
  ...contributionColumns,
];

export const membershipReactivationContributionColumns: GridColumn[] = [
  ...contributionColumns,
];

export function sort(array: GridColumn[]) {
  return array.sort((a, b) => a.position - b.position);
}

export function getActionConfig(contribution: Contribution) {
  const activeMemberActions = [
    {
      entity: contribution,
      position: 0,
      key: 'is_bereaved',
      label: 'Is Bereaved',
      icon: 'badge',
    },
  ];

  let actions;

  switch (contribution.type) {
    case ContributionType.Membership:
      actions = activeMemberActions;
      break;
  }
  let actionConfig;
  actionConfig = {
    actions: [
      {
        entity: contribution,
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
  Active: 'Active',
  InActive: 'InActive',
  Member: 'Member',
  Monthly: 'Monthly',
  Bereaved: 'Bereaved',
  Deceased: 'Deceased',
  Deactivated: 'Deactivated',
  'Membership Re-Activation': 'Re-activation',
  Male: 'Male',
  Female: 'Female',
  Father: 'Father',
  Mother: 'Mother',
  Brother: 'Brother',
  Sister: 'Sister',
  Son: 'Son',
  Daughter: 'Daughter',
  GrandMa: 'GrandMa',
  GrandPa: 'GrandPa',
  Uncle: 'Uncle',
  Aunt: 'Aunt',
  Nephew: 'Nephew',
  Niece: 'Niece',
  Cousin: 'Cousin',
};

export const statusColors: StatusColors = {
  Member: 'cyan',
  Monthly: 'green',
  'Membership Re-Activation': 'green',
  Active: 'green',
  InActive: 'gray',
  Normal: 'green',
  Bereaved: 'orange',
  Deceased: 'red',
  Deactivated: 'grey',
  Male: 'blue',
  Female: 'red',
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
