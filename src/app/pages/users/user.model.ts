export enum UserRole {
  SITE_ADMIN = 'Site Admin',
  WELFARE_MANAGER = 'Welfare Manager',
  CLIENT = 'Client',
}

export interface BaseEntity {
  id?: string;
  create_date?: Date;
  creator_id?: string;
  update_date?: Date;
  updator_id?: string;
}
export interface User extends BaseEntity {
  first_name?: string;
  last_name?: string;
  id_number?: string;
  phone_number?: string;
  email?: string;
  role?: UserRole;
  profile_image?: string;
  password?: string;
}

export class BaseEntity {
  constructor(
    id?: string,
    create_date?: Date,
    creator_id?: string,
    update_date?: Date,
    updator_id?: string
  ) {}
}

export class User extends BaseEntity {
  constructor(
    public override id?: string,
    public first_name?: string,
    public last_name?: string,
    public id_number?: string,
    public phone_number?: string,
    public email?: string,
    public role?: UserRole,
    public profile_image?: string,
    public group_id?: string,
    public password?: string,
    public override create_date?: Date,
    public override creator_id?: string,
    public override update_date?: Date,
    public override updator_id?: string
  ) {
    super(id, create_date, creator_id, update_date, updator_id);
  }
}
