import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
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

      snackBar.open(error.message, ``, {
        panelClass: `danger-dialog`,
      });

      return throwError(() => errorMessage);
    })
  );
};
