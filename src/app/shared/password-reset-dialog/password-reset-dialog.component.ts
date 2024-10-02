import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/misc/models/user.model';

@Component({
  selector: 'app-password-reset-dialog',
  templateUrl: './password-reset-dialog.component.html',
  styleUrls: ['./password-reset-dialog.component.scss'],
})
export class PasswordResetDialogComponent {
  resetPasswordForm: FormGroup = this.fb.group({
    password: [``, Validators.required],
    newPassword: [``, Validators.required],
    confirmNewPassword: [``, Validators.required],
  });
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
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
    this.data = {...this.resetPasswordForm.getRawValue()};
  }
}
