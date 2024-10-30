import { BaseEntity } from './base.entity';
import { Gender } from './user.entity';


export interface Child extends BaseEntity {
  name: string;
  gender: Gender;
  birth_date: string;
}

export class Child implements Child {}
