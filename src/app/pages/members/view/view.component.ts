import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DynamicViewComponent } from '../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/components/data-view/view.service';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import {
  childDataView,
  spouseDataView,
  accountDataView,
  welfareDataView,
} from './model';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { ViewPage } from '../../../shared/directives/view-page/view-page.directive';
import { Admin } from '../entities/admin.entity';
import { Member } from '../entities/member.entity';
import { BereavedMember } from '../entities/bereaved-member.entity';
import { DeceasedMember } from '../entities/deceased-member.entity';
import { DeactivatedMember } from '../entities/deactivated-member.entity';
import { Welfare } from '../../welfares/entities/welfare.entity';
import { Spouse } from '../entities/spouse.entity';
import { Child } from '../entities/child.entity';
import { UsersService } from '../users.service';
import { Membership } from '../entities/user.entity';

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
  account!:
    | Admin
    | Member
    | BereavedMember
    | DeceasedMember
    | DeactivatedMember;
  welfare?: Welfare;

  spouse?: Spouse;
  children?: Child[];

  accountDataView = inject(ACCOUNT_DATA_VIEW);
  welfareDataView = inject(WELFARE_DATA_VIEW);
  spouseDataView = inject(SPOUSE_DATA_VIEW);
  childDataView = [inject(CHILD_DATA_VIEW)];

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: UsersService
  ) {
    super(authService);
  }
  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        this.account = data['account'];
        this.welfare = (this.account as Member)?.welfare;
        this.spouse = (this.account as Member)?.spouse;
        this.children = (this.account as Member)?.children;

        this.accountDataView.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view) {
                  if (
                    this.account.membership == Membership.Admin &&
                    view.key == 'role'
                  ) {
                    view.visible = false;
                  } else
                    view.value = (
                      this.account as unknown as Record<
                        string,
                        string | number | Date
                      >
                    )?.[view.key] as string | number | Date;
                  if (!view.value) {
                    view.visible = false;
                  }
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
