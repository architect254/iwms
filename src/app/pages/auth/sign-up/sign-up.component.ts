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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription, concatMap, catchError, throwError, first } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole, User } from '../../users/user.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'iwms-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  signUpForm: FormGroup = this.fb.group(
    {
      first_name: [``, Validators.required],
      last_name: [``, Validators.required],
      id_number: [``, Validators.required],
      phone_number: [``, Validators.required],
      email: [``, [Validators.required, Validators.email]],
      password: [
        ``,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        ],
      ],
      confirm_password: [``, Validators.required],
    },
  );

  isSubmitting = false;

  isSigningIn = false;

  $subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signUpForm.setValidators(this.passwordMisMatchValidator);
    this.signUpForm.updateValueAndValidity();
  }

  get first_name() {
    return this.signUpForm.get(`first_name`);
  }
  get last_name() {
    return this.signUpForm.get(`last_name`);
  }
  get id_number() {
    return this.signUpForm.get(`id_number`);
  }
  get phone_number() {
    return this.signUpForm.get(`phone_number`);
  }
  get email() {
    return this.signUpForm.get(`email`);
  }
  get password() {
    return this.signUpForm.get(`password`);
  }
  get confirm_password() {
    return this.signUpForm.get(`confirm_password`);
  }

  ngOnInit(): void {}

  passwordMisMatchValidator() {
    return (form: FormGroup) => {
      const password = form.get(`password`);
      const confirm_password = form.get(`confirm_password`);
      console.log('validated');

      if (
        confirm_password?.errors &&
        !confirm_password.errors[`passwordsDontMatch`]
      ) {
        return;
      }

      if (password?.value !== confirm_password?.value) {
        form?.setErrors({ passwordsDontMatch: true });
        password?.setErrors({ passwordsDontMatch: true });
        confirm_password?.setErrors({ passwordsDontMatch: true });
      } else {
        form?.setErrors(null);
        password?.setErrors(null);
        confirm_password?.setErrors(null);
      }
      console.log('validated');
    };
  }

  submitForm() {
    this.isSubmitting = true;
    this.signUpForm.disable();

    const signUpPayload = {
      ...this.signUpForm.getRawValue(),
      role: UserRole.SITE_ADMIN,
    };
    delete signUpPayload.confirm_password;

    this.$subscriptions.add(
      this.authService
        .signUp(signUpPayload)
        .pipe(
          first(),
          concatMap(() => {
            this.isSubmitting = false;
            this.isSigningIn = true;
            const signInPayload = {
              ...this.signUpForm.getRawValue(),
              password: this.signUpForm.getRawValue().confirm_password,
            };
            delete signInPayload.confirm_password;
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
