import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/form-control/form.component';

import { DynamicCustomFormControlBase } from '../../../shared/form-control/form.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PageDirective } from '../../../shared/page/page.directive';
import { Welfare } from '../../welfares/model';
import { ValueType } from '../../../shared/form-control/control.component';
import { AuthService } from '../../../core/services/auth.service';
import { MembershipDetailsFormControls } from './model';
import { MembershipService } from '../memberships.service';
import { Membership } from '../model';

@Component({
  selector: 'iwms-upsert',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    DynamicFormComponent,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSnackBarModule,
    JsonPipe,
  ],
  providers: [],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends PageDirective {
  pageTitle!: string;
  viewUrl!: string;
  listUrl: string = '/memberships';

  pageAction!: 'update' | 'create';

  membership?: Membership;

  membershipDetailsFormControls$: Observable<
    DynamicCustomFormControlBase<ValueType>[]
  > = MembershipDetailsFormControls();

  $triggerValidityNotification = new BehaviorSubject(false);
  $isSubmitting = new BehaviorSubject(false);

  isProceedAllowed: boolean = false;

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: MembershipService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.pageAction = data['action'];
      this.viewUrl = `/memberships/view/${this.route.snapshot.paramMap.get(
        'id'
      )}`;

      this.membership = data['membership'];
      if (this.pageAction == 'update') {
        if (this.membership) {
          this.membershipDetailsFormControls$.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  if (control) {
                    control.value = (
                      this.membership as unknown as Record<
                        string,
                        string | number | Date
                      >
                    )[control.key] as string | number | Date;
                  }
                }
              );
            }
          );
        }
      }
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  get isSubmitting$(): Observable<boolean> {
    return this.$isSubmitting.asObservable();
  }

  set isSubmitting$(isIt: boolean) {
    this.$isSubmitting.next(isIt);
  }

  get triggerValidityNotification$() {
    return this.$triggerValidityNotification.asObservable();
  }

  set triggerValidityNotification(doTrigger: boolean) {
    this.$triggerValidityNotification.next(doTrigger);
  }

  onValidityNotified(formData: string) {
    const data = JSON.parse(formData);

    this.membership = <Membership>{ ...data };
    this.isProceedAllowed = true;
  }

  save() {
    this.isSubmitting$ = true;

    const payload: any = {
      membershipDto: this.membership,
    };

    let serviceAction$;

    if (this.pageAction == 'update') {
      serviceAction$ = this.service.updateMembership(
        this.membership?.id as number,
        payload
      );
    } else {
      serviceAction$ = this.service.createMembership(payload);
    }

    this.$subscriptions$.add(
      serviceAction$.subscribe({
        next: ({ id }) => {
          this.isSubmitting$ = false;

          this.router.navigate(['/', 'memberships', 'view', id]);

          const snackbar = inject(MatSnackBar);
          const snackBarRef = snackbar.open(
            `Membership successfully ${this.pageAction}d. Navigate back to Memberships List?`,
            `OK`,
            {
              panelClass: `.upsert-success-alert`,
              duration: 200,
            }
          );
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['../']);

            snackBarRef.dismiss();
          });
        },
        error: (err) => {
          this.isSubmitting$ = false;
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
