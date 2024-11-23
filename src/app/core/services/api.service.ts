import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Filter } from '../../shared/views/grid/model';
import {
  Searchable,
  SearchDto,
  SearchOption,
} from '../../shared/components/form-control/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements Searchable {
  readonly #SERVER_URL: string = false
    ? 'https://iwms-be-api.onrender.com'
    : 'http://iwms.com';
  readonly API_URL = `${this.#SERVER_URL}/api`;

  protected endpoint = `${this.API_URL}/`;

  protected http = inject(HttpClient);
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  protected snackBar = inject(MatSnackBar);

  constructor() {}

  buildFilterQueryString(
    page: number,
    take: number,
    filters?: Filter[]
  ): string {
    let queryString = '';
    filters?.forEach((filter, currentIndex) => {
      const { key, value } = filter;
      const query = `${key}=${value}`;
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

    return queryString;
  }

  search(searchDto: SearchDto): Observable<SearchOption[]> {
    const { page, take, term } = searchDto;
    const filters = [{ key: 'name', value: term }];
    const queryString = this.buildFilterQueryString(page, take, filters);
    const endpoint = `${this.endpoint}/search`;
    return this.http.get<SearchOption[]>(endpoint, {
      params: new HttpParams({ fromString: queryString }),
    });
  }
}
