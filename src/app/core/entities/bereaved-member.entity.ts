import { Member } from './member.entity';

export enum RelationshipWithDeceased {
  Father = 'Father',
  Mother = 'Mother',
  Brother = 'Brother',
  Sister = 'Sister',
  Son = 'Son',
  Daughter = 'Daughter',
  GrandMa = 'GrandMa',
  GrandPa = 'GrandPa',
  Uncle = 'Uncle',
  Aunt = 'Aunt',
  Nephew = 'Nephew',
  Niece = 'Niece',
  Cousin = 'Cousin',
}

export interface BereavedMember extends Member {
  bereavement_date: Date;
  deceased: string;
  relationship_with_deceased: RelationshipWithDeceased;
}

export class BereavedMember implements BereavedMember {}
