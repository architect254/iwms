import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  BASE_URL: string = `${environment.apiUrl}`;
  http: HttpClient = inject(HttpClient);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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
