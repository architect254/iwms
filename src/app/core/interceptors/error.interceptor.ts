import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let errorResponse: Error;

  const snackBar = inject(MatSnackBar);
  let snackBarRef: MatSnackBarRef<TextOnlySnackBar>;

  return next(req).pipe(
    catchError((apiError: HttpErrorResponse) => {
      if (apiError instanceof HttpErrorResponse) {
        errorResponse = new Error(
          `${apiError?.statusText || ''}. ${
            apiError?.error?.message
              ? apiError?.error?.message
              : apiError?.message
          }`
        );

        snackBarRef = snackBar.open(errorResponse?.message, `Retry`, {
          panelClass: `.api-error-alert.server`,
          duration: 200,
        });

        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
          next(req);
        });
      } else {
        errorResponse = new Error(
          `Something Went Wrong. Please try again later...`
        );

        snackBarRef = snackBar.open(errorResponse?.message, `OK`, {
          panelClass: `.api-error-alert.browser`,
          duration: 200,
        });

        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }

      return throwError(() => errorResponse);
    })
  );
};
