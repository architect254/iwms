import { Action } from 'rxjs/internal/scheduler/Action';
import { Welfare } from '../../../../core/entities/welfare.entity';
import { FilterOption, GridColumn } from '../../../../shared/views/grid/model';

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
    key: 'hostname',
    label: 'Host Name',
    position: 4,
    type: 'string',
    width: '250px',
  },
  {
    key: 'chairperson',
    label: 'Chair Person',
    position: 5,
    type: 'string',
    width: '250px',
  },
  {
    key: 'treasurer',
    label: 'Treasurer',
    position: 6,
    type: 'string',
    width: '250px',
  },
  {
    key: 'secretary',
    label: 'Secretary',
    position: 7,
    type: 'string',
    width: '250px',
  },
  {
    key: 'create_date',
    label: 'First Created',
    position: 8,
    type: 'date',
    width: '250px',
  },
  {
    key: 'update_date',
    label: 'Last Updated',
    position: 9,
    type: 'date',
    width: '250px',
  },
];

export const actions: Action<Welfare>[] = [];

export interface FilterRequest {
  name?: string;
  phone_number?: string;
  email?: string;
  manager?: string;
  accountant?: string;
  secretary?: string;
}
