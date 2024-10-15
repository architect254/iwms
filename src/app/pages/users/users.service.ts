import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { User } from './model';
import {
  CustomDateControl,
  CustomDropdownControl,
  CustomTextboxControl,
  DynamicCustomFormControlBase,
} from '../../shared/form-control/form.service';
import {
  CustomDateData,
  CustomListData,
  CustomStatusData,
  CustomTextData,
  DynamicCustomDataBase,
} from '../../shared/data-view/view.service';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Welfare } from '../welfares/model';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  protected override endpoint = `${this.API_URL}/users`;

  createUser(payload: any): Observable<User> {
    return this.http.post<User>(this.endpoint, payload);
  }

  updateUser(id: number | string, payload: any): Observable<User> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<User>(endpoint, payload);
  }

  getUsers(
    page: number,
    take: number,
    searchQueries: [string, string][]
  ): Observable<User[]> {
    let queryString = '';
    searchQueries?.forEach((searchQuery, currentIndex) => {
      const [param, value] = searchQuery;
      const query = `${param}=${value}`;
      if (currentIndex == 0) {
        queryString = `?${query}`;
      }
      if (currentIndex > 0 && currentIndex < searchQueries.length) {
        queryString = `${queryString}&${query}`;
      }
    });
    queryString = `${
      queryString ? queryString + '&' : ''
    }page=${page}&take=${take}`;

    return this.http.get<User[]>(this.endpoint, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getUserById(id: number | string): Observable<User> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<User>(endpoint);
  }

  getWelfareByMembershipId(id: string): Observable<Welfare> {
    const endpoint = `${this.endpoint}/welfare-by-membership-id/${id}`;
    return this.http.get<Welfare>(endpoint);
  }
}
