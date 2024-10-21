import { Member } from '../members/model';

export interface BaseEntity {
  id: number;
  create_date: Date;
  update_date: Date;
}

export class BaseEntity implements BaseEntity {}

export enum State {
  Active = 'Active',
  InActive = 'InActive',
}

export enum Class {
  Admin = 'Admin',
  Client = 'Client',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface Child extends BaseEntity {
  name: string;
  gender: Gender;
  birth_date: string;
}

export class Child implements Child {}

export interface Spouse extends BaseEntity {
  name: string;
  gender: Gender;
  id_number: string;
  phone_number: string;
  email: string;
}

export class Spouse implements Spouse {}

export interface Account extends BaseEntity {
  name: string;
  gender: Gender;
  birth_date: Date;
  id_number: string;
  phone_number: string;
  email: string;
  class: Class;
  state: State;
  profile_image_url: string;
  membership?: Member;
  spouse?: Spouse;
  children?: Child[];
}

export class Account implements Account {}
export type AccountApplication = Omit<Account, 'role' | 'status'>;
