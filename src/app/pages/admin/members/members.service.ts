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

@Injectable({
  providedIn: 'root',
})
export class MembersService extends ApiService implements Searchable {
  protected override endpoint = `${this.API_URL}/members`;

  create(
    payload: any
  ): Observable<Member | BereavedMember | DeceasedMember | DeactivatedMember> {
    return this.http.post<
      Member | BereavedMember | DeceasedMember | DeactivatedMember
    >(this.endpoint, payload);
  }

  update(
    id: number | string,
    payload: any
  ): Observable<Member | BereavedMember | DeceasedMember | DeactivatedMember> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<
      Member | BereavedMember | DeceasedMember | DeactivatedMember
    >(endpoint, payload);
  }

  isBereaved(
    id: number | string,
    payload: BereavedMemberDto
  ): Observable<BereavedMemberDto> {
    const endpoint = this.endpoint + '/' + id + '/is-bereaved';
    return this.http.put<BereavedMemberDto>(endpoint, payload, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
      observe: 'body',
      responseType: 'json',
    });
  }

  isDeceased(
    id: number | string,
    payload: DeceasedMemberDto
  ): Observable<DeceasedMemberDto> {
    const endpoint = this.endpoint + '/' + id + '/is-deceased';
    return this.http.put<DeceasedMemberDto>(endpoint, payload, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
      observe: 'body',
      responseType: 'json',
    });
  }

  isDeactivated(
    id: number | string,
    payload: DeactivatedMemberDto
  ): Observable<DeactivatedMemberDto> {
    const endpoint = this.endpoint + '/' + id + '/is-deactivated';
    return this.http.put<DeactivatedMemberDto>(endpoint, payload, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
      observe: 'body',
      responseType: 'json',
    });
  }

  activate(id: number | string): Observable<void> {
    const endpoint = this.endpoint + '/' + id + '/activate';
    return this.http.put<void>(endpoint, null, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getMany(
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<
    (Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
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
    (Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
    >(`${this.endpoint}/by-welfare/${id}`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  get(
    id: number | string
  ): Observable<Member | BereavedMember | DeceasedMember | DeactivatedMember> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<
      Member | BereavedMember | DeceasedMember | DeactivatedMember
    >(endpoint);
  }
}
