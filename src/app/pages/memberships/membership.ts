import { BaseEntity } from '../users/user.model';
import { Welfare } from '../welfares/welfare';

export enum MembershipStatus {
  ACTIVE = 'Active',
  INACTVE = 'Inactive',
}
export interface Membership extends BaseEntity {
  status: MembershipStatus;
  welfare: Welfare;
}
export class Membership implements Membership {}
