import { Membership, User } from '../entities/user.entity';
import { ToggleOption } from '../../../shared/components/button-toggle/button-toggle.component';
import {
  FilterOption,
  GridColumn,
  StatusColors,
  StatusLabels,
} from '../../../shared/views/grid/model';

const userToggleOptions: ToggleOption[] = [
  { name: 'All', value: 'all', position: 0 },
];
const memberToggleOptions: ToggleOption[] = [
  ...userToggleOptions,
  {
    name: 'All Welfare Members',
    value: 'members',
    position: 2,
  },
  {
    name: 'Active',
    value: 'active',
    position: 3,
  },
  {
    name: 'Bereaved',
    value: 'bereaved',
    position: 4,
  },
  {
    name: 'Deceased',
    value: 'deceased',
    position: 5,
  },
  {
    name: 'De-Activated',
    value: 'deactivated',
    position: 6,
  },
];

const adminToggleOptions: ToggleOption[] = [
  { name: 'Admin', value: 'admins', position: 1 },
  ...memberToggleOptions,
];

export const getToggleOptions = (user: User) => {
  if (user.membership == Membership.Admin) {
    return adminToggleOptions;
  } else {
    return memberToggleOptions;
  }
};

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

const adminfilters: FilterOption[] = [...userFilters];

const membersFilters: FilterOption[] = [
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
    case Membership.Admin:
      return adminfilters;

    case Membership.Active:
      return membersFilters;

    case Membership.Bereaved:
      return bereavedMembersFilters;

    case Membership.Deceased:
      return deceasedMembersFilters;

    case Membership.DeActivated:
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

const adminColumns: GridColumn[] = [...userColumns];

const membersColumns: GridColumn[] = [
  ...userColumns,
  {
    key: 'role',
    label: 'Role',
    position: 5,
    type: 'status',
    width: '250px',
  },
];

const bereavedMembersColumns: GridColumn[] = [
  ...membersColumns,
  {
    key: 'bereavement_date',
    label: 'Date of Bereavement',
    position: 6,
    type: 'date',
    width: '250px',
  },
  {
    key: 'deceased',
    label: 'Name of Deceased',
    position: 7,
    type: 'string',
    width: '250px',
  },
  {
    key: 'deceased_relationship',
    label: 'Relationship with Deceased',
    position: 8,
    type: 'status',
    width: '250px',
  },
];

const deceasedMembersColumns: GridColumn[] = [
  ...membersColumns,
  {
    key: 'demise_date',
    label: 'Date of Demise',
    position: 6,
    type: 'date',
    width: '250px',
  },
];

const deactivatedMembersColumns: GridColumn[] = [
  ...membersColumns,
  {
    key: 'deactivation_date',
    label: 'Date of Deactivation',
    position: 6,
    type: 'date',
    width: '250px',
  },
  {
    key: 'reason',
    label: 'Reason for Deactivation',
    position: 7,
    type: 'string',
    width: '250px',
  },
];

export const getGridColumns = (user: User) => {
  switch (user.membership) {
    case Membership.Admin:
      return adminColumns;

    case Membership.Active:
      return membersColumns;

    case Membership.Bereaved:
      return bereavedMembersColumns;

    case Membership.Deceased:
      return deceasedMembersColumns;

    case Membership.DeActivated:
      return deactivatedMembersColumns;

    default:
      return userColumns;
  }
};
export const statusLabels: StatusLabels = {
  Admin: 'Admin',
  ChairPerson: 'ChairPerson',
  Treasurer: 'Treasurer',
  Secretary: 'Secretary',
  Member: 'Member',
  Client: 'Client',
  Active: 'Active',
  InActive: 'InActive',
  Normal: 'Normal',
  Bereaved: 'Bereaved',
  Deceased: 'Deceased',
  Deactivated: 'Deactivated',
  Male: 'Male',
  Female: 'Female',
};

export const statusColors: StatusColors = {
  Admin: 'red',
  Client: 'green',
  ChairPerson: 'orange',
  Treasurer: 'blue',
  Secretary: 'purple',
  Member: 'cyan',
  Active: 'green',
  InActive: 'gray',
  Normal: 'green',
  Bereaved: 'orange',
  Deceased: 'red',
  Deactivated: 'grey',
  Male: 'blue',
  Female: 'red',
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