import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { error, log, profile } from 'console';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'adb-auth-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
})
export class AuthDialogComponent implements OnInit, OnDestroy {
  $action = new BehaviorSubject('Login');
  $subscription$ = new Subscription();

  authForm!: FormGroup;

  loading = false;

  constructor(
    private _fb: FormBuilder,
    readonly dialogRef: MatDialogRef<AuthDialogComponent>,
    private _authService: AuthService
  ) {}

  get action$() {
    return this.$action.asObservable();
  }
  ngOnInit(): void {
    this.$subscription$.add(
      this.action$.subscribe((action) => {
        if (action == 'Login') {
          this.authForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
          });
        } else {
          this.authForm = this._fb.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirm_password: ['', Validators.required],
          });
        }

        this.dialogRef.updateSize(
          `450px`,
          `${this.$action.value == 'Login' ? 400 : 700}px`
        );
      })
    );
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.authForm.get(`profile`)?.setValue(e.target.result);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  submit() {
    this.loading = true;
    const payLoad = this.authForm.getRawValue();

    if (this.$action.value != `Login`) {
      this.$subscription$.add(
        this._authService.signUp(payLoad).subscribe({
          next: () => {
            this.authForm.patchValue(payLoad);
            this.login(payLoad);
          },
          error: (error) => {
            this.loading = false;
          },
        })
      );
    } else {
      this.login(payLoad);
    }
  }

  login = (payload: any) => {
    this.$action.next(`Login`);
    this.$subscription$.add(
      this._authService.signIn(payload).subscribe({
        next: () => {
          this.loading = false;
          window.location.reload();
        },
        error: (error) => {
          this.loading = false;
        },
      })
    );
  };

  ngOnDestroy(): void {
    this.$subscription$.unsubscribe();
  }
}
