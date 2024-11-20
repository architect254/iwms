import { Admin } from '../../../../core/entities/admin.entity';
import { BereavedMember } from '../../../../core/entities/bereaved-member.entity';
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

const memberToggleOptions: ToggleOption[] = [
  {
    name: 'All',
    value: '',
    position: 3,
  },
  {
    name: 'Bereaved',
    value: Membership.Bereaved,
    position: 4,
  },
  {
    name: 'Deceased',
    value: Membership.Deceased,
    position: 5,
  },
  {
    name: 'De-Activated',
    value: Membership.Deactivated,
    position: 6,
  },
];

export const adminToggleOptions: ToggleOption[] = [...memberToggleOptions];

const userFilters: FilterOption[] = [
  {
    key: 'name',
    label: 'Full Name',
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

const userColumns: GridColumn[] = [
  {
    key: 'select',
    label: 'Select',
    position: 0,
    type: 'select',
    width: '250px',
  },
  {
    key: 'name',
    label: 'Full Name',
    position: 1,
    type: 'string',
    width: '250px',
  },
  {
    key: 'gender',
    label: 'Gender',
    position: 2,
    type: 'status',
    width: '250px',
  },
  {
    key: 'id_number',
    label: 'ID No.',
    position: 3,
    type: 'number',
    width: '250px',
  },
  {
    key: 'phone_number',
    label: 'Phone No.',
    position: 4,
    type: 'number',
    width: '250px',
  },
  {
    key: 'email',
    label: 'Email',
    position: 5,
    type: 'string',
    width: '250px',
  },
  {
    key: 'membership',
    label: 'Membership Type/Status',
    position: 6,
    type: 'status',
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

const membersColumns: GridColumn[] = [...userColumns];

export const allMemberColumns: GridColumn[] = [...userColumns];

export const activeMembersColumns: GridColumn[] = [...userColumns];

export const bereavedMembersColumns: GridColumn[] = [
  ...membersColumns,
  {
    key: 'deceased',
    label: 'Name of Deceased',
    position: 7,
    type: 'string',
    width: '250px',
  },
  {
    key: 'relationship_with_deceased',
    label: 'Relationship with Deceased',
    position: 8,
    type: 'status',
    width: '250px',
  },
  {
    key: 'bereavement_date',
    label: 'Date of Bereavement',
    position: 9,
    type: 'date',
    width: '250px',
  },
];

export const deceasedMembersColumns: GridColumn[] = [
  ...membersColumns,
  {
    key: 'demise_date',
    label: 'Date of Demise',
    position: 7,
    type: 'date',
    width: '250px',
  },
];

export const deactivatedMembersColumns: GridColumn[] = [
  ...membersColumns,
  {
    key: 'deactivation_date',
    label: 'Date of Deactivation',
    position: 7,
    type: 'date',
    width: '250px',
  },
  {
    key: 'reason',
    label: 'Reason for Deactivation',
    position: 8,
    type: 'string',
    width: '250px',
  },
];

export function sort(array: GridColumn[]) {
  return array.sort((a, b) => a.position - b.position);
}

export function getActionConfig(
  member: Member | BereavedMember | DeceasedMember | DeactivatedMember
) {
  const updateToBereavedAction = {
    entity: member,
    position: 0,
    key: 'update_to_bereaved',
    label: 'Update to Bereaved',
    icon: 'badge',
  };

  const updateToDeceasedAction = {
    entity: member,
    position: 1,
    key: 'update_to_deceased',
    label: 'Update to Deceased',
    icon: 'badge',
  };

  const deactivateAction = {
    entity: member,
    position: 2,
    key: 'deactivate',
    label: 'Deactivate',
    icon: 'badge',
  };

  const activateAction = {
    entity: member,
    position: 3,
    key: 'activate',
    label: 'Activate',
    icon: 'badge',
  };

  const viewContributions = {
    entity: member,
    position: 0,
    key: 'view_contributions',
    label: 'View Contributions',
    icon: 'badge',
  };

  const addMembershipContribution = {
    entity: member,
    position: 1,
    key: 'add_membership_contribution',
    label: 'Add Membership Contribution',
    icon: 'badge',
  };

  const addMonthlyContribution = {
    entity: member,
    position: 2,
    key: 'add_monthly_contribution',
    label: 'Add Monthly Contribution',
    icon: 'badge',
  };

  const addBereavedContribution = {
    entity: member,
    position: 3,
    key: 'add_bereaved_contribution',
    label: 'Add Bereaved Contribution',
    icon: 'badge',
  };

  const addDeceasedContribution = {
    entity: member,
    position: 4,
    key: 'add_deceased_contribution',
    label: 'Add Deceased Contribution',
    icon: 'badge',
  };

  const addReactivationContribution = {
    entity: member,
    position: 5,
    key: 'add_reactivation_contribution',
    label: 'Add Reactivation Contribution',
    icon: 'badge',
  };

  let actionConfig;
  actionConfig = {
    actions: [
      {
        entity: member,
        position: 0,
        key: 'status',
        label: 'Status',
        icon: 'edit',
      },
      {
        entity: member,
        position: 1,
        key: 'contributions',
        label: 'Contributions',
        icon: 'edit',
      },
    ] as ActionConfig[],
  } as ActionConfig;
  let statusActions, contributionActions;

  switch (member.membership) {
    case Membership.Member:
      statusActions = [
        updateToBereavedAction,
        updateToDeceasedAction,
        deactivateAction,
      ];
      contributionActions = [
        viewContributions,
        addMembershipContribution,
        addMonthlyContribution,
        addBereavedContribution,
        addDeceasedContribution,
        addReactivationContribution,
      ];
      break;

    case Membership.Active:
      statusActions = [
        updateToBereavedAction,
        updateToDeceasedAction,
        deactivateAction,
      ];
      contributionActions = [
        viewContributions,
        addMembershipContribution,
        addMonthlyContribution,
        addBereavedContribution,
        addDeceasedContribution,
        addReactivationContribution,
      ];
      break;

    case Membership.Bereaved:
      statusActions = [updateToDeceasedAction, deactivateAction];
      contributionActions = [
        viewContributions,
        addMembershipContribution,
        addMonthlyContribution,
        addBereavedContribution,
        addDeceasedContribution,
        addReactivationContribution,
      ];
      break;
    case Membership.Deactivated:
      statusActions = [activateAction];
      contributionActions = [viewContributions];
      break;
  }
  actionConfig.actions![0].actions = statusActions;
  actionConfig.actions![1].actions = contributionActions;

  return actionConfig;
}

export const statusLabels: StatusLabels = {
  Active: 'Active',
  InActive: 'InActive',
  Member: 'Member',
  Bereaved: 'Bereaved',
  Deceased: 'Deceased',
  Deactivated: 'Deactivated',
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
