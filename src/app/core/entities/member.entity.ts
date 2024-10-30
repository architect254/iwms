import { User } from './user.entity';
import { Child } from './child.entity';
import { Spouse } from './spouse.entity';
import { Welfare } from './welfare.entity';
import { Contribution } from './contribution.entity';

export enum Role {
  ChairPerson = 'ChairPerson',
  Treasurer = 'Treasurer',
  Secretary = 'Secretary',
  Member = 'Member',
}

export interface Member extends User {
  spouse: Spouse;
  children: Child[];
  role: Role;
  welfare: Welfare;
  from: Contribution[];
  to: Contribution[];
}

export class Member implements Member {}
