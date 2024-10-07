import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, map, Observable, of, tap, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { jwtDecode } from 'jwt-decode';

import { LocalStorageService, STORAGE_KEYS } from './local-storage.service';
import { JwtPayload } from '../../pages/auth/jwt.payload';
import { ApiService } from './api.service';
import { SignInDto, SignUpDto } from '../../pages/auth/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
  protected override endpoint = `${this.API_URL}/auth`;

  private _storageService = inject(LocalStorageService);

  private currentTokenSubject: BehaviorSubject<any> = new BehaviorSubject(
    this._storageService.get(STORAGE_KEYS.ACCESS_TOKEN)
  );
  public currentToken$: Observable<any> =
    this.currentTokenSubject.asObservable();

  private jwtHelper = new JwtHelperService();

  constructor(private _router: Router) {
    super();
    this.checkUser();
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
    return this.http.post<void>(`${this.API_URL}/auth/sign-up`, credentials);
  }

  signIn(credentials: SignInDto) {
    return this.http
      .post<any>(`${this.API_URL}/auth/sign-in`, credentials)
      .pipe(
        tap({
          next: ({ token }) => {
            this.currentTokenSubject.next(token);
            this._storageService.set(STORAGE_KEYS.ACCESS_TOKEN, token);
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
    this._storageService.remove(STORAGE_KEYS.ACCESS_TOKEN);
    this.currentTokenSubject.next(null);
    this._router.navigate(['/auth/sign-in']);
  }
}
