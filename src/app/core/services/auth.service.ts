import { inject, Injectable } from '@angular/core';

import {
  BehaviorSubject,
  first,
  map,
  Observable,
  ReplaySubject,
  tap,
} from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { jwtDecode } from 'jwt-decode';

import { LocalStorageService, STORAGE_KEYS } from './local-storage.service';
import { ApiService } from './api.service';
import { SignInDto, SignUpDto } from '../../shared/views/auth-dialog/auth.dto';
import { Admin } from '../entities/admin.entity';
import { Member } from '../entities/member.entity';
import { Membership } from '../entities/user.entity';
@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
  protected override endpoint = `${this.API_URL}/auth`;

  private _token = new ReplaySubject(1);

  private jwtHelper = new JwtHelperService();

  constructor(private _storage: LocalStorageService) {
    super();
  }

  get token(): Observable<any> {
    return this._token.asObservable().pipe(first());
  }

  get user(): Observable<Admin | Member | null> {
    return this.token.pipe(
      map((token) => {
        if (token) {
          const payload: JwtPayload = jwtDecode(token);
          const { user } = payload;
          return user;
        } else return null;
      })
    );
  }

  get isAuthenticated(): Observable<boolean> {
    return this.token.pipe(
      map((token) => {
        // return !this.jwtHelper
        //   .isTokenExpired(token, Date.now())
        //   .valueOf() as boolean;
        if (token) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  get isAdmin(): Observable<boolean> {
    return this.user.pipe(
      map((user: Member | Admin | null) => {
        return (user as Admin)?.isAdmin;
      })
    );
  }

  inilialize() {
    return new Promise<void>((resolve) => {
      const token = this._storage.get(STORAGE_KEYS.ACCESS_TOKEN);
      this._token.next(token);
      resolve();
    });
  }

  signUp(credentials: SignUpDto) {
    return this.http
      .post<void>(`${this.API_URL}/auth/sign-up`, credentials)
      .pipe(first());
  }

  signIn(credentials: SignInDto) {
    return this.http
      .post<any>(`${this.API_URL}/auth/sign-in`, credentials)
      .pipe(
        first(),
        tap({
          next: ({ token }) => {
            this._storage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
            this._token.next(token);
          },
        })
      );
  }

  resetPassword(payload: any) {
    return this.http.post<any>(`${this.API_URL}/auth/reset-password`, payload);
  }

  logout() {
    this._storage.clear();
    this._token.next(null);
  }
}
export interface JwtPayload {
  user: Admin | Member;
}
