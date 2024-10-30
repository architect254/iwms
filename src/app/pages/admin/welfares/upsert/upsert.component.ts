import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Member } from '../../../../core/entities/member.entity';
import { Welfare } from '../../../../core/entities/welfare.entity';
import { getIDNumber } from '../../../../core/models/utils';
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicFormComponent } from '../../../../shared/components/form-control/form.component';
import { DynamicCustomFormControlBase, ValueType } from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { EditableViewPage } from '../../../../shared/directives/view-page/editable-view-page.directive';
import { UsersService } from '../../members/users.service';
import { WelfaresService } from '../welfares.service';
import { welfareDetailsFormControls, chooseWelfareFormControls } from './model';


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
  providers: [
    {
      provide: WELFARE_DETAILS_FORM_CONTROLS,
      useFactory: welfareDetailsFormControls,
    },
    {
      provide: CHOOSE_WELFARE_FORM_CONTROLS,
      useFactory: chooseWelfareFormControls,
    },
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends EditableViewPage {
  override listUrl: string = '/welfare-groups';

  welfare?: Welfare;

  welfareDetailsFormControls = inject(WELFARE_DETAILS_FORM_CONTROLS);

  accountOptions!: Member[];
  filteredAccountOptions!: Observable<string[]>;

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: WelfaresService,
    private accountService: UsersService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        // this.pageTitle = data['title'];
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
                      if (
                        control.key == 'chairperson' ||
                        control.key == 'treasurer' ||
                        control.key == 'secretary'
                      ) {
                        control.value = getIDNumber(
                          control.key,
                          this.welfare?.members!
                        );
                      }
                    }
                  }
                );
              }
            );
          }
        }
      })
    );
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
      serviceAction = this.service.updateWelfare(this.welfare?.id!, payload);
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
            `Welfare group successfully ${this.pageAction.toLocaleLowerCase()}d. Navigate back to Welfare Groups List?`,
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
