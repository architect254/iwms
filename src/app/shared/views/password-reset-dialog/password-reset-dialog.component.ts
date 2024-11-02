import { Component, inject, Inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-password-reset-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './password-reset-dialog.component.html',
  styleUrls: ['./password-reset-dialog.component.scss'],
})
export class PasswordResetDialogComponent {
  private fb = inject(FormBuilder);

  resetPasswordForm: FormGroup = this.fb.group({
    password: [``, Validators.required],
    newPassword: [``, Validators.required],
    confirmNewPassword: [``, Validators.required],
  });
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<PasswordResetDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { password: string; newPassword: string }
  ) {}

  get password() {
    return this.resetPasswordForm.get(`password`);
  }
  get newPassword() {
    return this.resetPasswordForm.get(`newPassword`);
  }

  get confirmNewPassword() {
    return this.resetPasswordForm.get(`confirmNewPassword`);
  }

  submitForm() {
    this.data = { ...this.resetPasswordForm.getRawValue() };
  }
}
