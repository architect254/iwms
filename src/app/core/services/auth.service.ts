import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { jwtDecode } from 'jwt-decode';

import { LocalStorageService, STORAGE_KEYS } from './local-storage.service';
import { ApiService } from './api.service';
import { SignInDto, SignUpDto } from '../../shared/views/auth-dialog/auth.dto';
import { UserAccount } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
  protected override endpoint = `${this.API_URL}/auth`;

  private _storageService = inject(LocalStorageService);

  private currentTokenSubject: BehaviorSubject<any> = new BehaviorSubject(
    this._storageService.get(STORAGE_KEYS.ACCESS_TOKEN)
  );
  public currentToken: Observable<any> = this.currentTokenSubject
    .asObservable()
    .pipe(first());

  private jwtHelper = new JwtHelperService();

  constructor() {
    super();
  }

  get currentTokenUserValue(): Observable<UserAccount | null> {
    return this.currentToken.pipe(
      map((token) => {
        if (token) {
          const payload: JwtPayload = jwtDecode(token);
          return payload.account as UserAccount;
        } else return null;
      })
    );
  }

  get isAuthenticated(): Observable<boolean> {
    return this.currentToken.pipe(
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
            this._storageService.set(STORAGE_KEYS.ACCESS_TOKEN, token);
            this.checkUser();
          },
        })
      );
  }

  checkUser() {
    const token = this._storageService.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      this.currentTokenSubject.next(token);
    }
  }

  resetPassword(payload: any) {
    return this.http.post<any>(`${this.API_URL}/auth/reset-password`, payload);
  }

  logout() {
    this._storageService.clear();
    this.currentTokenSubject.next(null);
  }
}
export interface JwtPayload {
  account: UserAccount;
}
