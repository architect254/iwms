import { BaseEntity, Account } from '../accounts/model';
import { Welfare } from '../welfares/model';

export enum MemberRole {
  Manager = 'Manager',
  Accountant = 'Accountant',
  Secretary = 'Secretary',
  Member = 'Member',
}

export enum MemberStatus {
  Bereaved = 'Bereaved',
  Deceased = 'Deceased',
  Deactivated = 'Deactivated',
  Normal = 'Normal',
}

export interface Member extends BaseEntity {
  role: MemberRole;
  status: MemberStatus;
  account: Account;
  welfare: Welfare;
}

export class Member implements Member {}

export function buildName(role: string, members: Member[]): string {
  const RoleMap: Record<string, MemberRole> = {
    manager: MemberRole.Manager,
    accountant: MemberRole.Accountant,
    secretary: MemberRole.Secretary,
  };

  const account = members.find(
    (member) => member.role == RoleMap[role]
  )?.account;

  return buildAccountName(account!);
}

export function buildAccountName(account: Account): string {
  const first_name = account?.first_name;
  const last_name = account?.last_name;
  if (!(first_name || last_name)) {
    return 'N/A';
  }
  return `${first_name} ${last_name}`;
}
