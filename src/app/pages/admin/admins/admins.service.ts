import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from '../../../core/entities/admin.entity';
import {
  Searchable,
  SearchDto,
  SearchOption,
} from '../../../shared/components/form-control/model';
import { Filter } from '../../../shared/views/grid/model';
import { MembersService } from '../members/members.service';

@Injectable({
  providedIn: 'root',
})
export class AdminsService extends MembersService implements Searchable {
  protected override endpoint = `${this.API_URL}/users`;

  createAdmin(payload: any): Observable<Admin> {
    return this.http.post<Admin>(this.endpoint, payload);
  }

  updateAdmin(id: number | string, payload: any): Observable<Admin> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<Admin>(endpoint, payload);
  }

  getManyAdmin(
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<Admin[]> {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<Admin[]>(`${this.endpoint}`, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getAdmin(id: number | string): Observable<Admin> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<Admin>(endpoint);
  }

  searchAdmin(searchDto: SearchDto): Observable<SearchOption[]> {
    return of([]);
  }
}
