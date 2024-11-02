import { User } from './user.entity';

export interface Admin extends User {
  isAdmin: true;
}

export class Admin implements Admin {}
