import { BaseEntity } from './base.entity';
import { Gender } from './user.entity';


export interface Spouse extends BaseEntity {
  name: string;
  gender: Gender;
  id_number: string;
  phone_number: string;
  email: string;
}

export class Spouse implements Spouse {}
