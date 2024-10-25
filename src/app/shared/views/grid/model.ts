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
}

export interface Filter {
  key: string;
  value: string;
}

export type StatusLabels = { [status: string]: string };
export type StatusColors = { [status: string]: string };

export class Action<T> {
  private display: boolean = true;

  key: string;
  label: string;

  constructor(key: string, label: string, constraint: (entity: T) => void) {
    this.key = key;
    this.label = label;
    this.constraint = constraint;
  }

  constraint: (entity: T) => void;
}
