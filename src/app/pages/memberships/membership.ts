import { BaseEntity, User } from '../users/user.model';
import { Welfare } from '../welfares/welfare';

export enum MembershipStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}
export enum MembershipRole {
  WELFARE_MANAGER = 'Welfare Manager',
  WELFARE_ACCOUNTANT = 'Welfare Accountant',
  WELFARE_SECRETARY = 'Welfare Secretary',
  WELFARE_MEMBER = 'Welfare Member',
}
export interface Membership extends BaseEntity {
  status: MembershipStatus;
  membership_role: MembershipRole;
  member: User;
  welfare: Welfare;
}
export class Membership implements Membership {}
