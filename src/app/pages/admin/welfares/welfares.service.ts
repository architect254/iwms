import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Welfare } from '../../../core/entities/welfare.entity';
import { ApiService } from '../../../core/services/api.service';
import { Filter } from '../../../shared/views/grid/model';

@Injectable({
  providedIn: 'root',
})
export class WelfaresService extends ApiService {
  protected override endpoint = `${this.API_URL}/welfares`;

  constructor() {
    super();
  }

  createWelfare(payload: any): Observable<Welfare> {
    return this.http.post<Welfare>(this.endpoint, payload);
  }

  updateWelfare(id: number | string, payload: any): Observable<Welfare> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<Welfare>(endpoint, payload);
  }

  getWelfares(
    page: number = 1,
    take: number = 100,
    filters?: Filter[]
  ): Observable<Welfare[]> {
    const queryString = this.buildFilterQueryString(page, take, filters);
    return this.http.get<Welfare[]>(this.endpoint, {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  getWelfareById(id: number | string): Observable<Welfare> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<Welfare>(endpoint);
  }
}
