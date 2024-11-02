import { BaseEntity } from './base.entity';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum Membership {
  Active = 'Active',
  Bereaved = 'Bereaved',
  Deceased = 'Deceased',
  Deactivated = 'Deactivated',
}

export interface User extends BaseEntity {
  membership: Membership;
  name: string;
  gender: Gender;
  id_number: number;
  birth_date: Date;
  phone_number: string;
  email: string;
  profile_image?: string;
}

export class User implements User {}
