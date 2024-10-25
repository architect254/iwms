import { Member, Role } from '../../pages/users/entities/member.entity';

export function getName(role: string, clientAccounts: Member[]): string {
  const RoleMap: Record<string, Role> = {
    chairperson: Role.ChairPerson,
    treasurer: Role.Treasurer,
    secretary: Role.Secretary,
  };

  return (
    clientAccounts.find((clientAccount) => clientAccount.role == RoleMap[role])
      ?.name || 'N/A'
  );
}

export function getIDNumber(role: string, clientAccounts: Member[]): number {
  const RoleMap: Record<string, Role> = {
    chairperson: Role.ChairPerson,
    treasurer: Role.Treasurer,
    secretary: Role.Secretary,
  };

  return clientAccounts?.find(
    (clientAccount) => clientAccount.role == RoleMap[role]
  )?.id_number!;
}
