import { inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

export const API_SERVER_URL = new InjectionToken<string>(
  'Dynamic API Server URL'
);

export const apiServerUrlFactory = (): string => {
  if (false) {
    return 'https://iwms-be-api.onrender.com';
  } else {
    return `http://iwms.com`;
  }
};
@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  readonly #SERVER_URL: string = inject(API_SERVER_URL);
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

  $subscriptions: Subscription = new Subscription();

  constructor() {}

  ngOnDestroy(): void {
    if (this.$subscriptions) {
      this.$subscriptions.unsubscribe();
    }
  }
}
