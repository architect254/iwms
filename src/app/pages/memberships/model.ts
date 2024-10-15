import { BaseEntity, User } from '../users/model';
import { Welfare } from '../welfares/model';

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
export const buildName = (key: string, memberships: Membership[]): string => {
  const roleMap: Record<string, MembershipRole> = {
    manager: MembershipRole.WELFARE_MANAGER,
    accountant: MembershipRole.WELFARE_ACCOUNTANT,
    secretary: MembershipRole.WELFARE_SECRETARY,
  };

  const member = memberships.find(
    (membership) => membership.membership_role == roleMap[key]
  )?.member;
  console.log('buildname', member, roleMap[key]);
  const first_name = member?.first_name;
  const last_name = member?.last_name;
  if (!(first_name || last_name)) {
    return 'N/A';
  }
  return `${first_name} ${last_name}`;
};
export const buildMemberName = (membership: Membership): string => {
  const first_name = membership.member?.first_name;
  const last_name = membership.member?.last_name;
  if (!(first_name || last_name)) {
    return 'N/A';
  }
  return `${first_name} ${last_name}`;
};
