import {
  FilterOption,
  GridColumn,
  StatusColors,
  StatusLabels,
} from '../../../../shared/views/grid/model';

export const allUsersFilters: FilterOption[] = [
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
];

export const adminfilters: FilterOption[] = [...allUsersFilters];

export const allUsersColumns: GridColumn[] = [
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

export const adminColumns: GridColumn[] = [...allUsersColumns];

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
