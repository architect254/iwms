import {
  ChangeDetectionStrategy,
  Component,
  SkipSelf,
  inject,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Page } from '../../directives/page/page.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, concatMap, Observable } from 'rxjs';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SignInDto, SignUpDto } from './auth.dto';
import { passwordsMismatchValidator } from './password.validator';

@Component({
  selector: 'adb-auth-dialog',
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
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    CommonModule,
  ],
  providers: [MatDatepickerModule, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
})
export class AuthComponent extends Page {
  private _action = new BehaviorSubject<'Sign Up' | 'Sign In'>('Sign In');

  private fb = inject(FormBuilder);

  authForm!: FormGroup;

  isSigningUp = false;
  isSigningIn = false;

  startDate = new Date(2000, 0, 1);
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(Date.now());

  constructor(
    @SkipSelf() authService: AuthService,
    override dialogRef: MatDialogRef<AuthComponent>
  ) {
    super(authService);
  }

  get action(): Observable<'Sign Up' | 'Sign In'> {
    return this._action.asObservable();
  }

  set action(action: 'Sign Up' | 'Sign In') {
    this._action.next(action);
  }

  get name() {
    return this.authForm.get(`name`);
  }
  get id_number() {
    return this.authForm.get(`id_number`);
  }
  get birth_date() {
    return this.authForm.get(`birth_date`);
  }
  get phone_number() {
    return this.authForm.get(`phone_number`);
  }
  get email() {
    return this.authForm.get(`email`);
  }
  get password() {
    return this.authForm.get(`password`);
  }
  get confirm_password() {
    return this.authForm.get(`confirm_password`);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
  }

  buildForm() {
    this.subscriptions.add(
      this.action.subscribe((action) => {
        switch (action) {
          case 'Sign In':
            this.authForm = this.fb.group({
              id_number: [``, Validators.required],
              password: [``, Validators.required],
            });
            // this.dialogRef.updateSize(`700px`, `700px`);
            break;
          case 'Sign Up':
            this.authForm = this.fb.group(
              {
                name: [``, Validators.required],
                id_number: [``, Validators.required],
                birth_date: [``, Validators.required],
                phone_number: [``, Validators.required],
                email: [``, [Validators.required, Validators.email]],
                password: [
                  ``,
                  {
                    validators: [
                      Validators.required,
                      Validators.minLength(7),
                      Validators.maxLength(15),
                      // Validators.pattern(
                      //   '^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){7,15}$'
                      // ),
                    ],
                    updateOn: 'change',
                  },
                ],
                confirm_password: [
                  ``,
                  { validators: [Validators.required], updateOn: 'change' },
                ],
              },
              { validator: passwordsMismatchValidator() }
            );
            // this.dialogRef.updateSize(`700px`, `950px`);
            break;

          default:
            break;
        }
      })
    );
  }

  submitForm() {
    this.authForm.disable();
    switch (this._action.value) {
      case 'Sign Up':
        this.signUp();
        break;
      case 'Sign In':
        this.signIn();
        break;

      default:
        break;
    }
  }

  signUp() {
    this.isSigningUp = true;

    const signUpPayload: SignUpDto = {
      ...this.authForm.value,
    };

    // const persisted_users = await firstValueFrom(
    //   this.usersService.getUsers(1, 1)
    // );
    // if (persisted_users.length) {
    //   const snackBarRef = this.snackBar.open(
    //     'Kindly contact your Welfare Manager to add you',
    //     `OK`,
    //     {
    //       panelClass: `alert-dialog`,
    //     }
    //   );

    //   snackBarRef.onAction().subscribe(() => {
    //     snackBarRef.dismiss();
    //   });
    // }

    this.subscriptions.add(
      this.authService
        .signUp(signUpPayload)
        .pipe(
          concatMap(() => {
            this.isSigningUp = false;
            this.isSigningIn = true;

            const signInPayload: SignInDto = {
              ...signUpPayload,
            };
            return this.authService.signIn(signInPayload);
          })
        )
        .subscribe({
          next: () => {
            this.isSigningIn = false;
            this.dialogRef?.close();
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.isSigningUp = false;
            this.isSigningIn = false;
            this.authForm.enable();
          },
        })
    );
  }
  signIn() {
    this.isSigningIn = true;

    const signInPayload: SignInDto = {
      ...this.authForm.value,
    };

    this.subscriptions.add(
      this.authService.signIn(signInPayload).subscribe({
        next: () => {
          this.isSigningIn = false;
          this.dialogRef?.close();
          window.location.reload();
        },
        error: (error) => {
          this.isSigningIn = false;
          this.authForm.enable();
        },
      })
    );
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
