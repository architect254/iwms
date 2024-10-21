export type DataType =
  | 'select'
  | 'string'
  | 'number'
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
  colors?: { [key: string]: string };
}

export interface Filter {
  key: string;
  value: string;
}

export interface StatusConfig {
  labels: { [value: string]: string | undefined };
  colors: { [value: string]: string | undefined };
}

export interface Action {
  name: string;
  implementation: () => void;
}
