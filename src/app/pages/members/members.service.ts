import { Injectable } from '@angular/core';
import { Member } from './model';

import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService extends ApiService {
  protected override endpoint = `${this.API_URL}/members`;

  constructor() {
    super();
  }

  createMember(payload: any): Observable<Member> {
    return this.http.post<Member>(this.endpoint, payload);
  }

  updateMember(id: number | string, payload: any): Observable<Member> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<Member>(endpoint, payload);
  }

  getMembers(
    page: number = 1,
    take: number = 100,
    filters?: [string, string][]
  ): Observable<Member[]> {
    return this.http.get<Member[]>(this.endpoint, {
      params: new HttpParams().set('page', page).set('take', take),
    });
  }

  getMemberById(id: number | string): Observable<Member> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<Member>(endpoint);
  }
}
