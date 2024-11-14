export type DataType =
  | 'select'
  | 'string'
  | 'number'
  | 'currency'
  | 'date'
  | 'status'
  | 'action';

export interface GridColumn {
  key: string;
  label: string;
  type: DataType;
  position: number;
  width: string;
}

export interface FilterOption {
  key: string;
  label: string;
  type: string;
  position: number;
  icon: string;
  placeholder?: string;
  combinator: string;
  value?: string;
  options?: { key: string; value: string }[];
}

export interface Filter {
  key: string;
  value: string;
}

export type StatusLabels = { [status: string]: string };
export type StatusColors = { [status: string]: string };

export interface ActionConfig {
  entity: any | any[];
  position: number;
  key: string;
  label: string;
  icon: string;
  actions?: ActionConfig[];
}
