import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './model';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Welfare } from '../welfares/model';

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
    filters?: [string, string][]
  ): Observable<Account[]> {
    let queryString = '';
    filters?.forEach((filter, currentIndex) => {
      const [param, value] = filter;
      const query = `${param}=${value}`;
      if (currentIndex == 0) {
        queryString = `?${query}`;
      }
      if (currentIndex > 0 && currentIndex < filters.length) {
        queryString = `${queryString}&${query}`;
      }
    });
    queryString = `${
      queryString ? queryString + '&' : ''
    }page=${page}&take=${take}`;

    return this.http.get<Account[]>(this.endpoint, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  searchAccounts(accountName: string): Observable<Account[]> {
    const endpoint = this.endpoint + 'by-name';
    return this.http.get<Account[]>(endpoint);
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
