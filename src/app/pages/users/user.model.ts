export enum UserRole {
  ADMIN = 'Admin',
  WELFARE_MANAGER = 'Welfare Manager',
  USER = 'user',
}

export interface User {
  firstname: string;
  lastname: string;
  phone_number: string;
  email: string;
  role: UserRole;
  password: string;
}

export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public phone_number: string,
    public email: string,
    public role: UserRole,
    public password: string
  ) {}
}
