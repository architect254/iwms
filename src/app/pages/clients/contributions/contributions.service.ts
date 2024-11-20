import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BereavedMember } from '../../../core/entities/bereaved-member.entity';
import { DeactivatedMember } from '../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../core/entities/deceased-member.entity';
import { Member } from '../../../core/entities/member.entity';
import { ApiService } from '../../../core/services/api.service';
import {
  Searchable,
  SearchDto,
  SearchOption,
} from '../../../shared/components/form-control/model';
import { Filter } from '../../../shared/views/grid/model';
import { BereavedMemberDto } from '../../../shared/views/is-bereaved-member-dialog/model';
import { DeceasedMemberDto } from '../../../shared/views/is-deceased-member-dialog/model';
import { DeactivatedMemberDto } from '../../../shared/views/is-deactivated-member-dialog/model';
import {
  BereavedMemberContribution,
  DeceasedMemberContribution,
  MembershipContribution,
  MembershipReactivationContribution,
  MonthlyContribution,
} from '../../../core/entities/contribution.entity';

@Injectable({
  providedIn: 'root',
})
export class ContributionsService extends ApiService implements Searchable {
  protected override endpoint = `${this.API_URL}/contributions`;

  create(
    payload: any
  ): Observable<
    | MembershipContribution
    | MonthlyContribution
    | BereavedMemberContribution
    | DeceasedMemberContribution
    | MembershipReactivationContribution
  > {
    return this.http.post<
      | MembershipContribution
      | MonthlyContribution
      | BereavedMemberContribution
      | DeceasedMemberContribution
      | MembershipReactivationContribution
    >(this.endpoint, payload);
  }

  update(
    id: number | string,
    payload: any
  ): Observable<
    | MembershipContribution
    | MonthlyContribution
    | BereavedMemberContribution
    | DeceasedMemberContribution
    | MembershipReactivationContribution
  > {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<
      | MembershipContribution
      | MonthlyContribution
      | BereavedMemberContribution
      | DeceasedMemberContribution
      | MembershipReactivationContribution
    >(endpoint, payload);
  }

  getMany(
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<
    (
      | MembershipContribution
      | MonthlyContribution
      | BereavedMemberContribution
      | DeceasedMemberContribution
      | MembershipReactivationContribution
    )[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (
        | MembershipContribution
        | MonthlyContribution
        | BereavedMemberContribution
        | DeceasedMemberContribution
        | MembershipReactivationContribution
      )[]
    >(`${this.endpoint}`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getManyByWelfareId(
    id: string,
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<
    (
      | MembershipContribution
      | MonthlyContribution
      | BereavedMemberContribution
      | DeceasedMemberContribution
      | MembershipReactivationContribution
    )[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (
        | MembershipContribution
        | MonthlyContribution
        | BereavedMemberContribution
        | DeceasedMemberContribution
        | MembershipReactivationContribution
      )[]
    >(`${this.endpoint}/by-welfare/${id}`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getManyByMemberId(
    id: string,
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<
    (
      | MembershipContribution
      | MonthlyContribution
      | BereavedMemberContribution
      | DeceasedMemberContribution
      | MembershipReactivationContribution
    )[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (
        | MembershipContribution
        | MonthlyContribution
        | BereavedMemberContribution
        | DeceasedMemberContribution
        | MembershipReactivationContribution
      )[]
    >(`${this.endpoint}/by-member/${id}`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  get(
    id: number | string
  ): Observable<
    | MembershipContribution
    | MonthlyContribution
    | BereavedMemberContribution
    | DeceasedMemberContribution
    | MembershipReactivationContribution
  > {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<
      | MembershipContribution
      | MonthlyContribution
      | BereavedMemberContribution
      | DeceasedMemberContribution
      | MembershipReactivationContribution
    >(endpoint);
  }
}
