import {
  Action,
  FilterOption,
  GridColumn,
  StatusConfig,
} from '../../../shared/views/grid/model';

export const FILTER_OPTIONS: FilterOption[] = [
  {
    key: 'first_name',
    label: 'First Name',
    position: 0,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
  {
    key: 'last_name',
    label: 'Last Name',
    position: 1,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
  {
    key: 'id_number',
    label: 'ID No.',
    position: 2,
    type: 'number',
    icon: 'fingerprint',
    combinator: 'Includes',
  },
  {
    key: 'birth_date',
    label: 'Date of Birth',
    position: 3,
    type: 'date',
    icon: 'cake',
    combinator: 'Is',
  },
  {
    key: 'phone_number',
    label: 'Phone No.',
    position: 4,
    type: 'number',
    icon: 'call_log',
    combinator: 'Is',
  },
  {
    key: 'email',
    label: 'Email',
    position: 5,
    type: 'string',
    icon: 'email',
    combinator: 'Includes',
  },
  {
    key: 'role',
    label: 'Account Role',
    position: 6,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'Site Admin', value: 'Site Admin' },
      { key: 'Welfare Manager', value: 'Welfare Manager' },
      { key: 'Welfare Accountant', value: 'Welfare Accountant' },
      { key: 'Welfare Secretary', value: 'Welfare Secretary' },
      { key: 'Welfare Client Member', value: 'Welfare Client Member' },
    ],
    colors: {
      'Site Admin': 'red',
      'Welfare Manager': 'orange',
      'Welfare Accountant': 'blue',
      'Welfare Secretary': 'purple',
      'Welfare Client Member': 'green',
    },
  },
  {
    key: 'group',
    label: 'Welfare Group',
    position: 7,
    type: 'string',
    icon: 'group',
    combinator: 'Is',
  },
];

export const GRID_COLUMNS: GridColumn[] = [
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
    key: 'id_number',
    label: 'ID No.',
    position: 2,
    type: 'number',
    width: '250px',
  },
  {
    key: 'phone_number',
    label: 'Phone No.',
    position: 3,
    type: 'number',
    width: '250px',
  },
  {
    key: 'email',
    label: 'Email',
    position: 4,
    type: 'string',
    width: '250px',
  },
  {
    key: 'status',
    label: 'Account Status',
    position: 5,
    type: 'status',
    width: '250px',
  },
  {
    key: 'type',
    label: 'Account Type',
    position: 6,
    type: 'status',
    width: '250px',
  },
  {
    key: 'welfare',
    label: 'Welfare Group Name',
    position: 7,
    type: 'string',
    width: '250px',
  },
  {
    key: 'role',
    label: 'Membership Role',
    position: 8,
    type: 'status',
    width: '250px',
  },
  {
    key: 'm_status',
    label: 'Membership Status',
    position: 9,
    type: 'status',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'First Created',
    position: 10,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Last Updated',
    position: 11,
    type: 'date',
    width: '250px',
  },
];

export const STATUS: StatusConfig = {
  labels: {
    Admin: 'Admin',
    Manager: 'Manager',
    Accountant: 'Accountant',
    Secretary: 'Secretary',
    Member: 'Member',
    Client: 'Client',
    Active: 'Active',
    Inactive: 'Inactive',
  },
  colors: {
    Admin: 'red',
    Client: 'green',
    Manager: 'orange',
    Accountant: 'blue',
    Secretary: 'purple',
    Member: 'cyan',
    Active: 'green',
    Inactive: 'black',
  },
};

export const ACTIONS: Action[] = [
  {
    name: 'click',
    implementation: () => {
      undefined;
    },
  },
];

export interface FilterRequestDto {
  first_name?: string;
  last_name?: string;
  id_number?: string;
  birth_date?: Date;
  phone_number?: string;
  email?: string;
  role?: string;
  status?: string;
  groupId?: number;
}
