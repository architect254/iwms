import { Welfare } from '../../users/entities/user.entity';
import {
  Action,
  FilterOption,
  GridColumn,
} from '../../../shared/views/grid/model';

export const filters: FilterOption[] = [
  {
    key: 'name',
    label: 'Welfare Group',
    position: 0,
    type: 'string',
    icon: 'badge',
    combinator: 'Includes',
  },
  {
    key: 'phone_number',
    label: 'Phone No.',
    position: 1,
    type: 'number',
    icon: 'call_log',
    combinator: 'Is',
  },
  {
    key: 'email',
    label: 'Email',
    position: 2,
    type: 'string',
    icon: 'email',
    combinator: 'Includes',
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
    key: 'chairperson',
    label: 'Chair Person',
    position: 4,
    type: 'string',
    width: '250px',
  },
  {
    key: 'treasurer',
    label: 'Treasurer',
    position: 5,
    type: 'string',
    width: '250px',
  },
  {
    key: 'secretary',
    label: 'Secretary',
    position: 6,
    type: 'string',
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

export const actions: Action<Welfare>[] = [
  new Action('', '', (entity: Welfare) => {}),
];

export interface FilterRequest {
  name?: string;
  phone_number?: string;
  email?: string;
  manager?: string;
  accountant?: string;
  secretary?: string;
}
