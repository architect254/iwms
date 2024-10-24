import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Filter } from '../../shared/views/grid/model';
import {
  AdminUserAccount,
  ClientUserAccount,
  Welfare,
} from '../../core/models/entities';

@Injectable({
  providedIn: 'root',
})
export class AccountsService extends ApiService {
  protected override endpoint = `${this.API_URL}/user-accounts`;

  createAccount(
    payload: any
  ): Observable<AdminUserAccount | ClientUserAccount> {
    return this.http.post<AdminUserAccount | ClientUserAccount>(
      this.endpoint,
      payload
    );
  }

  updateAccount(
    id: number | string,
    payload: any
  ): Observable<AdminUserAccount | ClientUserAccount> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<AdminUserAccount | ClientUserAccount>(
      endpoint,
      payload
    );
  }

  getAccounts(
    page: number = 1,
    take: number = 100,
    selected: string = 'all',
    filters?: Filter[]
  ): Observable<(AdminUserAccount | ClientUserAccount)[]> {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<(AdminUserAccount | ClientUserAccount)[]>(
      `${this.endpoint}/${selected}`,
      {
        params: new HttpParams({ fromString: queryString }),
      }
    );
  }

  getAccountById(
    id: number | string
  ): Observable<AdminUserAccount | ClientUserAccount> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<AdminUserAccount | ClientUserAccount>(endpoint);
  }

  getWelfareByMemberId(id: string): Observable<Welfare> {
    const endpoint = `${this.endpoint}/welfare-by-member-id/${id}`;
    return this.http.get<Welfare>(endpoint);
  }
}
