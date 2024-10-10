import { Component, inject } from '@angular/core';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { concatMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SignInDto, SignUpDto } from '../auth.dto';
import { PageDirective } from '../../../shared/page/page.directive';

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
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    CommonModule,
  ],
  providers: [MatDatepickerModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends PageDirective {
  private fb = inject(FormBuilder);

  signUpForm: FormGroup = this.fb.group(
    {
      first_name: [``, Validators.required],
      last_name: [``, Validators.required],
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
    { validator: this.passwordMisMatchValidator() }
  );

  isSigningUp = false;

  isSigningIn = false;

  startDate = new Date(2000, 0, 1);
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(Date.now());

  constructor(private authService: AuthService) {
    super();
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
  get birth_date() {
    return this.signUpForm.get(`birth_date`);
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

  override ngOnInit() {
    super.ngOnInit();
  }

  passwordMisMatchValidator() {
    return (form: FormGroup) => {
      const password = form.get(`password`);
      const confirm_password = form.get(`confirm_password`);

      if (
        confirm_password?.errors &&
        !confirm_password?.errors[`passwordsDontMatch`]
      ) {
        return;
      }

      if (password?.value !== confirm_password?.value) {
        confirm_password?.setErrors({ passwordsDontMatch: true });
      } else {
        confirm_password?.setErrors(null);
      }
    };
  }

  async submitForm() {
    this.isSigningUp = true;

    const signUpPayload: SignUpDto = {
      ...this.signUpForm.value,
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

    this.signUpForm.disable();
    this.$subscriptions$.add(
      this.authService
        .signUp(signUpPayload)
        .pipe(
          concatMap(() => {
            this.isSigningUp = false;
            this.isSigningIn = true;

            const signInPayload: SignInDto = {
              ...signUpPayload,
            };
            return this.authService.signIn(signInPayload, this.document);
          })
        )
        .subscribe({
          next: () => {
            this.isSigningIn = false;
          },
          error: (error) => {
            this.isSigningUp = false;
            this.isSigningIn = false;

            this.signUpForm.enable();
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
