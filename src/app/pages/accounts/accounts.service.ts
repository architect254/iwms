import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './model';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Welfare } from '../welfares/model';
import { Filter } from '../../shared/views/grid/model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService extends ApiService {
  protected override endpoint = `${this.API_URL}/accounts`;

  createAccount(payload: any): Observable<Account> {
    return this.http.post<Account>(this.endpoint, payload);
  }

  updateAccount(id: number | string, payload: any): Observable<Account> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<Account>(endpoint, payload);
  }

  getAccounts(
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<Account[]> {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<Account[]>(this.endpoint, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getAccountById(id: number | string): Observable<Account> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<Account>(endpoint);
  }

  getWelfareByMemberId(id: string): Observable<Welfare> {
    const endpoint = `${this.endpoint}/welfare-by-member-id/${id}`;
    return this.http.get<Welfare>(endpoint);
  }
}
