import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { jwtDecode } from 'jwt-decode';

import { environment } from '../../environments/environment';
import { JwtPayload } from './jwt.payload';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentTokenSubject: BehaviorSubject<any> = new BehaviorSubject(
    this._storage.get(`accessToken`)
  );
  public currentToken$: Observable<any> =
    this.currentTokenSubject.asObservable();
  private jwtHelper = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute,
    private _storage: LocalStorageService
  ) {}

  public get currentTokenUserValue$(): Observable<any> {
    return this.currentToken$.pipe(
      map((token) => {
        if (token) {
          const payload: JwtPayload = jwtDecode(token);
          return payload.user;
        }
        return null;
      })
    );
  }

  login(email: string, password: string) {
    return this._http
      .post<{ [key: string]: string }>(`${environment.apiUrl}/auth/sign-in`, {
        email,
        password,
      })
      .pipe(
        tap({
          next: ({ accessToken }) => {
            this.currentTokenSubject.next(accessToken);
            this._storage.set('accessToken', accessToken);
          },
        })
      );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.currentToken$.pipe(
      map((token) => {
        const isAuthenticated = !this.jwtHelper.isTokenExpired(token);
        return isAuthenticated;
      })
    );
  }

  logout() {
    this._storage.remove('accessToken');
    this.currentTokenSubject.next(null);
    this._router.navigate(['../sign-in'], { relativeTo: this._route });
  }
}
