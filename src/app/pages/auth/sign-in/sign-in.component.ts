import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  Subscription,
  catchError,
  first,
  of,
  switchMap,
  throwError,
} from 'rxjs';
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
export class SignInComponent implements OnInit {
  private fb = inject(FormBuilder);

  signInForm: FormGroup = this.fb.group({
    email: [``, Validators.required],
    password: [``, Validators.required],
  });

  isSigningIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.authService.checkUser();
  }

  get email() {
    return this.signInForm.get(`email`);
  }
  get password() {
    return this.signInForm.get(`password`);
  }
  ngOnInit() {
    this.authService.$subscriptions.add(
      this.authService.isAuthenticated$
        .pipe(
          switchMap((isAuthenticated) => {
            if (isAuthenticated) {
              return this.authService.currentTokenUserValue$;
            } else {
              return of(null);
            }
          })
        )
        .subscribe((user) => {
          if (!!user && user?.role == 'Site Admin') {
            this.router.navigate(['/users']);
          }
        })
    );
  }

  submitForm() {
    this.signInForm.disable();

    this.isSigningIn = true;

    this.authService.$subscriptions.add(
      this.authService
        .signIn(this.signInForm.value)
        .pipe(first(), catchError(this.authService.errorHandler))
        .subscribe({
          next: () => {
            this.isSigningIn = false;
            this.authService.$subscriptions.add(
              this.authService.currentTokenUserValue$.subscribe((user) => {
                if (!!user && user?.role == 'Site Admin') {
                  this.router.navigate([`/users`]);
                }
              })
            );
          },
          error: (error) => {
            this.signInForm.enable();

            this.isSigningIn = false;

            const snackBarRef = this.snackBar.open(error?.message, `Retry`, {
              panelClass: `alert-dialog`,
            });

            snackBarRef.onAction().subscribe(() => {
              snackBarRef.dismiss();
              this.submitForm();
            });
          },
        })
    );
  }
}
