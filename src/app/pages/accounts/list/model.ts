import {
  AdminUserAccount,
  ClientUserAccount,
} from '../../../core/models/entities';
import { ToggleOption } from '../../../shared/components/button-toggle/button-toggle.component';
import {
  Action,
  FilterOption,
  GridColumn,
  StatusConfig,
} from '../../../shared/views/grid/model';

export const toggleOptions: ToggleOption[] = [
  { name: 'All', value: 'all' },
  { name: 'Admin', value: 'admins' },
  { name: 'Client', value: 'clients' },
];

export const userAccountFilters: FilterOption[] = [
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
    key: 'type',
    label: 'Account Type',
    position: 6,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'Admin', value: 'Admin' },
      { key: 'Client', value: 'Client' },
    ],
    colors: {
      Admin: 'red',
      Client: 'green',
    },
  },
  {
    key: 'state',
    label: 'Account Status',
    position: 7,
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
];

export const userAccountColumns: GridColumn[] = [
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
    key: 'type',
    label: 'Account Type',
    position: 5,
    type: 'status',
    width: '250px',
  },
  {
    key: 'state',
    label: 'Account Status',
    position: 6,
    type: 'status',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'First Created',
    position: 7,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Last Updated',
    position: 8,
    type: 'date',
    width: '250px',
  },
];

export const adminUserAccountfilters: FilterOption[] = [
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
    label: 'Account Status',
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
];

export const adminUserAccountColumns: GridColumn[] = [
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
    label: 'Account Status',
    position: 5,
    type: 'status',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'First Created',
    position: 6,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Last Updated',
    position: 7,
    type: 'date',
    width: '250px',
  },
];

export const clientUserAccountfilters: FilterOption[] = [
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
    label: 'Account Status',
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
    label: 'Role',
    position: 7,
    type: 'list',
    icon: 'checklist',
    combinator: 'Is',
    options: [
      { key: 'ChairPerson', value: 'Chair-Person' },
      { key: 'Treasurer', value: 'Treasurer' },
      { key: 'Secretary', value: 'Secretary' },
      { key: 'Member', value: 'Member' },
    ],
    colors: {
      ChairPerson: 'yellow',
      Treasurer: 'blue',
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
      { key: 'Active', value: 'Normal' },
      { key: 'Bereaved', value: 'Bereaved' },
      { key: 'Deceased', value: 'Deceased' },
      { key: 'DeActivated', value: 'DeActivated' },
    ],
    colors: {
      Active: 'green',
      Bereaved: 'orange',
      Deceased: 'red',
      DeActivated: 'grey',
    },
  },
  {
    key: 'group',
    label: 'Welfare Group',
    position: 9,
    type: 'string',
    icon: 'group',
    combinator: 'Is',
  },
];

export const clientUserAccountColumns: GridColumn[] = [
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
    label: 'Account Status',
    position: 5,
    type: 'status',
    width: '250px',
  },
  {
    key: 'role',
    label: 'Role',
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
    Admin: 'Admin',
    Manager: 'Manager',
    Accountant: 'Accountant',
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
  },
  colors: {
    Admin: 'red',
    Client: 'green',
    Manager: 'orange',
    Accountant: 'blue',
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
  },
};

export const actions: Action<AdminUserAccount | ClientUserAccount>[] = [
  new Action('', '', (entity: AdminUserAccount | ClientUserAccount) => {}),
  new Action('', '', (entity: AdminUserAccount | ClientUserAccount) => {}),
];

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
