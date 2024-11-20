import { BaseEntity } from './base.entity';
import { Page } from './page.entity';
import { Welfare } from './welfare.entity';

export enum ConfigType {
  Main = 'Main',
  NonMain = 'NonMain',
}

export interface Config extends BaseEntity {
  type: ConfigType;
  host: string;
  welfare: Welfare[];
  page: Page;
}
export class Config implements Config {}
