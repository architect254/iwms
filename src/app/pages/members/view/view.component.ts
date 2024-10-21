import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DynamicViewComponent } from '../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/components/data-view/view.service';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Member } from '../model';
import { MembersService } from '../members.service';
import { childDataView, memberDataView, spouseDataView } from './model';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { ViewPage } from '../../../shared/directives/view-page/view-page.directive';
import { Account, Spouse, Child } from '../../accounts/model';

export const MEMBER_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('member data view');

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
    { provide: MEMBER_DATA_VIEW, useFactory: memberDataView },
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
  override listUrl: string = '/members';

  member?: Member;
  account?: Account;

  spouse?: Spouse;
  children?: Child[];

  memberDataView = inject(MEMBER_DATA_VIEW);
  spouseDataView = inject(SPOUSE_DATA_VIEW);
  childDataView = [inject(CHILD_DATA_VIEW)];

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: MembersService
  ) {
    super(authService);
  }
  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        // this.pageTitle = data['title'];
        this.updateUrl = `/members/${this.route.snapshot.paramMap.get('id')}/update`;

        this.member = data['member'];
        this.account = this.member?.account;

        this.spouse = this.account?.spouse;
        this.children = this.account?.children;

        if (this.member) {
          this.memberDataView.forEach(
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
                      )?.[view.key] as string | number | Date) ||
                      ((
                        this.member as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )?.[view.key] as string);
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
