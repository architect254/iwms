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
  readonly #API_URL: string = `${environment.apiUrl}`;
  readonly BASE_URL = `${this.#API_URL}/api`;

  protected endpoint = `${this.BASE_URL}`;

  protected http = inject(HttpClient);
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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