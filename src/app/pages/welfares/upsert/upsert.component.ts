import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, map, Observable, startWith, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/components/form-control/form.component';

import {
  CustomDropdownControl,
  CustomSearchControl,
  DynamicCustomFormControlBase,
} from '../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Page } from '../../../shared/directives/page/page.directive';
import { Welfare } from '../../welfares/model';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { AuthService } from '../../../core/services/auth.service';
import { chooseWelfareFormControls, welfareDetailsFormControls } from './model';
import { WelfaresService } from '../welfares.service';
import { Account } from '../../accounts/model';
import { AccountsService } from '../../accounts/accounts.service';

export const WELFARE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('welfare details form controls');

export const CHOOSE_WELFARE_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('choose welfare form controls');

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
  viewProviders: [
    {
      provide: WELFARE_DETAILS_FORM_CONTROLS,
      useFactory: welfareDetailsFormControls,
      deps: [AccountsService],
    },
    {
      provide: CHOOSE_WELFARE_FORM_CONTROLS,
      useFactory: chooseWelfareFormControls,
      deps: [WelfaresService],
    },
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends Page {
  pageTitle!: string;
  pageAction!: 'update' | 'create';
  viewUrl!: string;
  listUrl: string = '/welfare-groups';

  welfare?: Welfare;

  welfareDetailsFormControls = inject(WELFARE_DETAILS_FORM_CONTROLS);

  accountOptions!: Account[];
  filteredAccountOptions!: Observable<string[]>;

  private _triggerValidityNotification = new BehaviorSubject(false);
  private _isSubmitting = new BehaviorSubject(false);

  isProceedAllowed: boolean = false;

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: WelfaresService,
    private accountService: AccountsService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.pageAction = data['action'];
      this.viewUrl = `/welfare-groups/${this.route.snapshot.paramMap.get(
        'id'
      )}`;

      this.welfare = data['welfare'];
      this.accountOptions = data['accounts'];
      if (this.pageAction == 'update') {
        if (this.welfare) {
          this.welfareDetailsFormControls.forEach(
            (form: DynamicCustomFormControlBase<ValueType>[]) => {
              form.forEach(
                (control: DynamicCustomFormControlBase<ValueType>) => {
                  if (control) {
                    control.value = (
                      this.welfare as unknown as Record<
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

  get isSubmitting(): Observable<boolean> {
    return this._isSubmitting.asObservable();
  }

  set isSubmitting(isIt: boolean) {
    this._isSubmitting.next(isIt);
  }

  get triggerValidityNotification(): Observable<boolean> {
    return this._triggerValidityNotification.asObservable();
  }

  set triggerValidityNotification(doTrigger: boolean) {
    this._triggerValidityNotification.next(doTrigger);
  }

  onValidityNotified(formData: string) {
    const data = JSON.parse(formData);

    this.welfare = <Welfare>{ ...data };
    this.isProceedAllowed = true;
  }

  save() {
    this.isSubmitting = true;

    const payload: any = {
      welfareDto: this.welfare,
    };

    let serviceAction;

    if (this.pageAction == 'update') {
      serviceAction = this.service.updateWelfare(
        this.welfare?.id as number,
        payload
      );
    } else {
      serviceAction = this.service.createWelfare(payload);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = false;

          this.router.navigate(['/', 'welfare-groups', 'view', id]);

          const snackbar = inject(MatSnackBar);
          const snackBarRef = snackbar.open(
            `Welfare group successfully ${this.pageAction}d. Navigate back to Welfare Groups List?`,
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
          this.isSubmitting = false;
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
