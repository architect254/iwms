import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription, catchError, first, throwError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'iwms-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  signInForm: FormGroup = this.fb.group({
    email: [``, Validators.required],
    password: [``, Validators.required],
  });
  isSubmitting = false;

  $subscriptions!: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  get email() {
    return this.signInForm.get(`email`);
  }
  get password() {
    return this.signInForm.get(`password`);
  }
  ngOnInit() {
    this.$subscriptions = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl(`/`);
        }
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.signInForm.disable();
    this.$subscriptions.add(
      this.authService
        .signIn(this.signInForm.getRawValue())
        .pipe(
          first(),
          catchError((error: Error) => {
            if (error instanceof HttpErrorResponse) {
              return throwError(
                () => new Error(`${error.statusText}. ${error.error.message}`)
              );
            } else {
              return throwError(
                () =>
                  new Error(`Something Went Wrong. Please try again later..`)
              );
            }
          })
        )
        .subscribe(
          () => {
            this.isSubmitting = false;
            this.router.navigateByUrl(`/`);
          },
          (error) => {
            this.isSubmitting = false;
            this.signInForm.enable();

            const snackBarRef = this._snackBar.open(error.message, `Retry`, {
              panelClass: `alert-dialog`,
            });

            snackBarRef.onAction().subscribe(() => {
              snackBarRef.dismiss();
              this.submitForm();
            });
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }
}
