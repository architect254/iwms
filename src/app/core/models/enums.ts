export enum State {
  Active = 'Active',
  InActive = 'InActive',
}

export enum AccountType {
  Admin = 'Admin',
  Client = 'Client',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum Role {
  ChairPerson = 'Chair-Person',
  Treasurer = 'Treasurer',
  Secretary = 'Secretary',
  Member = 'Member',
}

export enum Status {
  Bereaved = 'Bereaved',
  Deceased = 'Deceased',
  Deactivated = 'Deactivated',
  Normal = 'Normal',
}
export enum ContributionType {
  Membership = 'Membership',
  Monthly = 'Monthly',
  BereavedMember = 'Bereaved Member',
  DeceasedMember = 'Deceased Member',
  MembershipReActivation = 'Membership Re-Activation',
}
export enum TransactionType {
  Internal = 'Internal',
  External = 'External',
}
export enum TransactionStatus {
  Committed = 'Committed',
  RolledBack = 'Rolled Back',
}
