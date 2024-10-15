import {
  FilterOption,
  GridColumn,
  StatusConfig,
} from '../../../shared/grid/model';

export const FILTER_OPTIONS: FilterOption[] = [
  {
    key: 'name',
    label: 'Welfare Name',
    position: 0,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
  {
    key: 'phone_number',
    label: 'Welfare Phone No.',
    position: 1,
    type: 'number',
    icon: 'call_log',
    combinator: 'Is',
  },
  {
    key: 'email',
    label: 'Welfare Email',
    position: 2,
    type: 'string',
    icon: 'email',
    combinator: 'Includes',
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
    label: 'Name',
    position: 1,
    type: 'string',
    width: '250px',
  },
  {
    key: 'phone_number',
    label: 'Phone No.',
    position: 2,
    type: 'number',
    width: '250px',
  },
  {
    key: 'email',
    label: 'Email',
    position: 3,
    type: 'string',
    width: '250px',
  },
  {
    key: 'status',
    label: 'Account Status',
    position: 4,
    type: 'status',
    width: '250px',
  },
  {
    key: 'membership_role',
    label: 'Membership Role',
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
export const STATUS: StatusConfig = {
  labels: {
    'Welfare Manager': 'Welfare Manager',
    'Welfare Accountant': 'Welfare Accountant',
    'Welfare Secretary': 'Welfare Secretary',
    'Welfare Member': 'Welfare Member',
    Active: 'Active',
    Inactive: 'Inactive',
  },
  colors: {
    'Welfare Manager': 'orange',
    'Welfare Accountant': 'blue',
    'Welfare Secretary': 'purple',
    'Welfare Member': 'cyan',
    Active: 'green',
    Inactive: 'black',
  },
};
export interface FilterRequestDto {
  name?: string;
  phone_number?: string;
  email?: string;
  status?: string;
  membership_role?: string;
}
