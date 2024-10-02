import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { jwtDecode } from 'jwt-decode';

import { LocalStorageService, STORAGE_KEYS } from './local-storage.service';
import { environment } from '../../../environments/environment';
import { JwtPayload } from '../../pages/auth/jwt.payload';
import { ApiService } from './api.service';
import { AuthDto } from '../../pages/auth/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
  protected override endpoint = `${this.BASE_URL}/auth`;

  private _storageService = inject(LocalStorageService);

  private currentTokenSubject: BehaviorSubject<any> = new BehaviorSubject(
    this._storageService.get(`accessToken`)
  );
  public currentToken$: Observable<any> =
    this.currentTokenSubject.asObservable();

  private jwtHelper = new JwtHelperService();

  constructor(private _router: Router, private _route: ActivatedRoute) {
    super();
  }

  get currentTokenUserValue$(): Observable<any> {
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

  get isAuthenticated$(): Observable<boolean> {
    return this.currentToken$.pipe(
      map((token) => {
        return !this.jwtHelper.isTokenExpired(token);
      })
    );
  }

  signUp(credentials: AuthDto) {
    return this.http.post<void>(
      `${environment.apiUrl}/auth/sign-up`,
      credentials
    );
  }

  signIn({ phone_number, password }: AuthDto) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/sign-in`, {
        phone_number,
        password,
      })
      .pipe(
        tap({
          next: ({ token }) => {
            this.currentTokenSubject.next(token);
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
          },
        })
      );
  }

  signOut() {
    // remove user from local storage to log user out
    this.currentTokenSubject.next(null);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  resetPassword(payload: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/reset-password`,
      payload
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<{ [key: string]: string }>(`${environment.apiUrl}/auth/sign-in`, {
        email,
        password,
      })
      .pipe(
        tap({
          next: ({ accessToken }) => {
            this.currentTokenSubject.next(accessToken);
            this._storageService.set('accessToken', accessToken);
          },
        })
      );
  }

  logout() {
    this._storageService.remove('accessToken');
    this.currentTokenSubject.next(null);
    this._router.navigate(['../sign-in'], { relativeTo: this._route });
  }
}
