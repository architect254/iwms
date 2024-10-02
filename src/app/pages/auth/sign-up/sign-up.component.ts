import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription, concatMap, catchError, throwError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole, User } from '../../users/user.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  signUpForm: FormGroup = this.fb.group({
    firstname: [``, Validators.required],
    lastname: [``, Validators.required],
    phone_number: [``, Validators.required],
    password: [``, Validators.required],
    confirmPassword: [``, Validators.required],
  });

  isSubmitting = false;

  isSigningIn = false;

  passwordMismatch: boolean = false;

  $subscriptions: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signUpForm.setValidators(this.passwordMisMatch);
    this.signUpForm.updateValueAndValidity();
  }

  get firstname() {
    return this.signUpForm.get(`firstname`);
  }
  get lastname() {
    return this.signUpForm.get(`lastname`);
  }
  get phoneNo() {
    return this.signUpForm.get(`phone_number`);
  }
  get password() {
    return this.signUpForm.get(`password`);
  }
  get confirmPassword() {
    return this.signUpForm.get(`confirmPassword`);
  }

  ngOnInit(): void {}

  passwordMisMatch() {
    return (form: FormGroup) => {
      const password = form.get(`password`);
      const confirmPassword = form.get(`confirmPassword`);

      if (
        confirmPassword?.errors &&
        !confirmPassword.errors[`passwordMismatch`]
      ) {
        return;
      }

      if (password?.value !== confirmPassword?.value) {
        form.setErrors({ pinMatch: true });
      } else {
        form?.setErrors(null);
      }
    };
  }

  submitForm() {
    this.isSubmitting = true;
    this.signUpForm.disable();

    const signUpPayload = {
      ...this.signUpForm.getRawValue(),
      role: UserRole.ADMIN,
    };
    delete signUpPayload.confirmPassword;

    this.$subscriptions.add(
      this.authService
        .signUp(signUpPayload)
        .pipe(
          concatMap(() => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            const signInPayload = {
              ...this.signUpForm.getRawValue(),
              password: this.signUpForm.getRawValue().confirmPassword,
            };
            delete signInPayload.confirmPassword;
            delete signInPayload.role;
            return this.authService.signIn(signInPayload);
          }),
          catchError((error: HttpErrorResponse) => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            this.signUpForm.enable();

            if (error instanceof HttpErrorResponse) {
              return throwError(
                new Error(`${error.statusText}. ${error.error.message}`)
              );
            } else {
              return throwError(
                new Error(`Something Went Wrong. Please try again later..`)
              );
            }
          })
        )
        .subscribe(
          (user: User) => {
            this.isSubmitting = false;
            this.isSigningIn = false;
            this.router.navigateByUrl(`/`);
          },
          (error) => {
            this.isSubmitting = false;
            this.isSigningIn = false;
            this.signUpForm.enable();

            const snackBarRef = this._snackBar.open(error.message, `Retry`, {
              panelClass: `alert-dialog`,
            });

            snackBarRef.onAction().subscribe(() => {
              this.submitForm();
            });

            snackBarRef.dismiss();
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }
}
