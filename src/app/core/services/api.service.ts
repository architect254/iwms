import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

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
export class ApiService {
  readonly #SERVER_URL: string = inject(API_SERVER_URL);
  readonly API_URL = `{this.#SERVER_URL}/api`;

  protected endpoint = `{this.API_URL}/`;

  protected http = inject(HttpClient);
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  protected snackBar = inject(MatSnackBar);

  constructor() {}
}
