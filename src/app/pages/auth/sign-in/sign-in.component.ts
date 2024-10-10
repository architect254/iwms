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
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PageDirective } from '../../../shared/page/page.directive';

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
export class SignInComponent extends PageDirective {
  private fb = inject(FormBuilder);

  signInForm: FormGroup = this.fb.group({
    email: [``, Validators.required],
    password: [``, Validators.required],
  });

  isSigningIn = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    super();
  }

  get email() {
    return this.signInForm.get(`email`);
  }
  get password() {
    return this.signInForm.get(`password`);
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }

  submitForm() {
    this.isSigningIn = true;

    this.signInForm.disable();
    this.$subscriptions$.add(
      this.authService.signIn(this.signInForm.value, this.document).subscribe({
        next: () => {
          this.isSigningIn = false;
        },
        error: (error) => {
          this.isSigningIn = false;
          this.signInForm.enable();
        },
      })
    );
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
