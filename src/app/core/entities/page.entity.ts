import { BaseEntity } from './base.entity';
import { Config } from './config.entity';

export interface Page extends BaseEntity {
  page_name: string;
  home_content: string;
  config: Config;
}

export class Page implements Page {}
