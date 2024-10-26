import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Filter } from '../../shared/views/grid/model';
import { Admin } from './entities/admin.entity';
import { BereavedMember } from './entities/bereaved-member.entity';
import { DeceasedMember } from './entities/deceased-member.entity';
import { DeactivatedMember } from './entities/deactivated-member.entity';
import { Member } from './entities/member.entity';
import {
  Searchable,
  SearchDto,
  SearchOption,
} from '../../shared/components/form-control/model';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService implements Searchable {
  protected override endpoint = `${this.API_URL}/users`;

  create(
    payload: any
  ): Observable<
    Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
  > {
    return this.http.post<
      Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
    >(this.endpoint, payload);
  }

  update(
    id: number | string,
    payload: any
  ): Observable<
    Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
  > {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<
      Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
    >(endpoint, payload);
  }

  getMany(
    selected: string = 'all',
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<
    (Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
  > {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<
      (Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember)[]
    >(`${this.endpoint}/${selected}`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  get(
    id: number | string
  ): Observable<
    Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
  > {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<
      Admin | Member | BereavedMember | DeceasedMember | DeactivatedMember
    >(endpoint);
  }

  search(searchDto: SearchDto): Observable<SearchOption[]> {
    return of([]);
  }
}
