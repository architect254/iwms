import { User } from './user.entity';

export interface Admin extends User {}

export class Admin implements Admin {}
