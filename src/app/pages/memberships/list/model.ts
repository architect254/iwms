import {
  FilterOption,
  GridColumn,
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
    label: 'Welfare Name',
    position: 1,
    type: 'string',
    width: '250px',
  },
  {
    key: 'phone_number',
    label: 'Welfare Phone No.',
    position: 2,
    type: 'number',
    width: '250px',
  },
  {
    key: 'email',
    label: 'Welfare Email',
    position: 3,
    type: 'string',
    width: '250px',
  },
  {
    key: 'manager',
    label: 'Welfare Manager',
    position: 4,
    type: 'string',
    width: '250px',
  },
  {
    key: 'manager',
    label: 'Welfare Accountant',
    position: 5,
    type: 'string',
    width: '250px',
  },
  {
    key: 'manager',
    label: 'Welfare Secretary',
    position: 6,
    type: 'string',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'Date First Created',
    position: 7,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Date Last Updated',
    position: 8,
    type: 'date',
    width: '250px',
  },
];
export interface FilterRequestDto {
  name?: string;
  phone_number?: string;
  email?: string;
  manager?: string;
  accountant?: string;
  secretary?: string;
}
