import {
  Action,
  FilterOption,
  GridColumn,
  StatusConfig,
} from '../../../shared/views/grid/model';

export const filters: FilterOption[] = [
  {
    key: 'name',
    label: 'Full Name',
    position: 0,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
  {
    key: 'gender',
    label: 'Gender',
    position: 1,
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
    position: 2,
    type: 'number',
    icon: 'fingerprint',
    combinator: 'Is',
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
    key: 'state',
    label: 'Account State',
    position: 6,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },
    ],
    colors: {
      Active: 'orange',
      InActive: 'gray',
    },
  },
  {
    key: 'role',
    label: 'Membership Role',
    position: 7,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'Manager', value: 'Manager' },
      { key: 'Accountant', value: 'Accountant' },
      { key: 'Secretary', value: 'Secretary' },
      { key: 'Member', value: 'Member' },
    ],
    colors: {
      Manager: 'yellow',
      Accountant: 'blue',
      Secretary: 'purple',
      Member: 'green',
    },
  },
  {
    key: 'status',
    label: 'Membership Status',
    position: 8,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'Normal', value: 'Normal' },
      { key: 'Bereaved', value: 'Bereaved' },
      { key: 'Deceased', value: 'Deceased' },
      { key: 'Deactivated', value: 'Deactivated' },
    ],
    colors: {
      Normal: 'green',
      Bereaved: 'orange',
      Deceased: 'red',
      Deactivated: 'grey',
    },
  },
];

export const columns: GridColumn[] = [
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
    key: 'state',
    label: 'Account State',
    position: 5,
    type: 'status',
    width: '250px',
  },
  {
    key: 'role',
    label: 'Membership Role',
    position: 6,
    type: 'status',
    width: '250px',
  },
  {
    key: 'status',
    label: 'Membership Status',
    position: 7,
    type: 'status',
    width: '250px',
  },
  {
    key: 'welfare',
    label: 'Welfare Group',
    position: 8,
    type: 'string',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'First Created',
    position: 9,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Last Updated',
    position: 10,
    type: 'date',
    width: '250px',
  },
];

export const status: StatusConfig = {
  labels: {
    Manager: 'Manager',
    Accountant: 'Accountant',
    Secretary: 'Secretary',
    Member: 'Member',
    Active: 'Active',
    Inactive: 'Inactive',
    Normal: 'Normal',
    Bereaved: 'Bereaved',
    Deceased: 'Deceased',
    Deactivated: 'Deactivated',
  },
  colors: {
    Manager: 'orange',
    Accountant: 'blue',
    Secretary: 'purple',
    Member: 'cyan',
    Active: 'green',
    Inactive: 'gray',
    Normal: 'green',
    Bereaved: 'orange',
    Deceased: 'red',
    Deactivated: 'grey',
  },
};

export const actions: Action[] = [
  {
    name: 'click',
    implementation: () => {
      undefined;
    },
  },
];

export interface FilterRequest {
  name?: string;
  id_number?: string;
  birth_date?: Date;
  phone_number?: string;
  email?: string;
  state?: string;
  role?: string;
  status?: string;
}
