import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Subscription, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  readonly #SERVER_URL: string = `${environment.serverUrl}`;
  readonly API_URL = `${this.#SERVER_URL}/api`;

  protected endpoint = `${this.API_URL}/`;

  protected http = inject(HttpClient);
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'http://iwms.com',
      Host: '127.0.0.1:3000',
    }),
  };
  protected snackBar = inject(MatSnackBar);

  $subscriptions$: Subscription = new Subscription();

  constructor() {}

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof HttpErrorResponse) {
      // Get server-side error
      errorMessage = `${error.status} - ${error.statusText || ''}: ${
        error.message
      }`;
    } else {
      // Get client-side error
      errorMessage = error.error.message;
    }
    return throwError(() => errorMessage);
  }

  ngOnDestroy(): void {
    if (this.$subscriptions$) {
      this.$subscriptions$.unsubscribe();
    }
  }
}
