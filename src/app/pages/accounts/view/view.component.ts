import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DynamicViewComponent } from '../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/components/data-view/view.service';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from '../accounts.service';
import { Child, Spouse, Account } from '../model';
import { AuthService } from '../../../core/services/auth.service';
import {
  childDataView,
  spouseDataView,
  accountDataView,
  welfareDataView,
} from './model';
import { Member } from '../../members/model';
import { Welfare } from '../../welfares/model';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { ViewPage } from '../../../shared/directives/view-page/view-page.directive';

export const ACCOUNT_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('account data view');

export const WELFARE_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('welfare data view');

export const SPOUSE_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('spouse data view');

export const CHILD_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('spouse data view');

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [
    {
      provide: ACCOUNT_DATA_VIEW,
      useFactory: accountDataView,
    },
    {
      provide: WELFARE_DATA_VIEW,
      useFactory: welfareDataView,
    },
    {
      provide: SPOUSE_DATA_VIEW,
      useFactory: spouseDataView,
    },
    {
      provide: CHILD_DATA_VIEW,
      useFactory: childDataView,
    },
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends ViewPage {
  override listUrl: string = '/accounts';

  account!: Account;
  member?: Member;
  welfare?: Welfare;

  spouse?: Spouse;
  children?: Child[];

  accountDataView = inject(ACCOUNT_DATA_VIEW);
  welfareDataView = inject(WELFARE_DATA_VIEW);
  spouseDataView = inject(SPOUSE_DATA_VIEW);
  childDataView = [inject(CHILD_DATA_VIEW)];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: AccountsService
  ) {
    super(authService);
  }
  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        // this.pageTitle = data['title'];
        this.editUrl = `/accounts/${this.route.snapshot.paramMap.get(
          'id'
        )}/update`;

        this.account = data['account'];
        this.member = this.account?.member;
        this.welfare = this.member?.welfare;
        this.spouse = this.account?.spouse;
        this.children = this.account?.children;

        this.accountDataView.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view) {
                  view.value =
                    ((
                      this.account as unknown as Record<
                        string,
                        string | number | Date
                      >
                    )[view.key] as string | number | Date) ||
                    ((
                      this.member as unknown as Record<
                        string,
                        string | number | Date
                      >
                    )[view.key] as string);
                }
              }
            );
          }
        );

        if (this.welfare) {
          this.welfareDataView.forEach(
            (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
              dataView.forEach(
                (view: DynamicCustomDataBase<string | number | Date>) => {
                  if (view) {
                    view.value = (
                      this.welfare as unknown as Record<
                        string,
                        string | number | Date
                      >
                    )[view.key] as string | number | Date;
                  }
                }
              );
            }
          );
        }

        if (this.spouse) {
          this.spouseDataView.forEach(
            (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
              dataView.forEach(
                (view: DynamicCustomDataBase<string | number | Date>) => {
                  if (view) {
                    view.value = (
                      this.spouse as unknown as Record<
                        string,
                        string | number | Date
                      >
                    )[view.key] as string | number | Date;
                  }
                }
              );
            }
          );
        }

        if (this.children?.length) {
          this.children.forEach((child, index) => {
            if (index > 0) {
              this.childDataView.push(childDataView());
            }
          });
          this.childDataView.forEach(
            (
              dataViewGroup: Observable<DynamicCustomDataBase<ValueType>[]>,
              dataViewGoupIndex
            ) => {
              dataViewGroup.forEach(
                (dataView: DynamicCustomDataBase<ValueType>[]) => {
                  if (dataView) {
                    dataView.forEach(
                      (view: DynamicCustomDataBase<ValueType>) => {
                        view.value = ((
                          this.children as unknown as Record<
                            string,
                            string | number | Date
                          >[]
                        )?.[dataViewGoupIndex])[view.key];
                      }
                    );
                  }
                }
              );
            }
          );
        }
      })
    );
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
