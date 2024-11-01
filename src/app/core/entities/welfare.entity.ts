import { BaseEntity } from "./base.entity";
import { Member } from "./member.entity";

export interface Welfare extends BaseEntity {
  name: string;
  email: string;
  phone_number: string;
  logo_url?: string;
  chairperson: Member;
  treasurer: Member;
  secretary: Member;
  members: Member[];
}

export class Welfare implements Welfare {}
