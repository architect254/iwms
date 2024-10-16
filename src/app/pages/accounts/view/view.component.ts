import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DynamicViewComponent } from '../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/components/data-view/view.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from '../accounts.service';
import { Child, Spouse, Account } from '../model';
import { Page } from '../../../shared/directives/page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import {
  childDataView,
  spouseDataView,
  accountDataView,
  welfareDataView,
} from './model';
import { Member } from '../../members/model';
import { Welfare } from '../../welfares/model';

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends Page {
  pageTitle!: string;
  editUrl!: string;
  listUrl: string = '/users';

  account!: Account;
  member?: Member;
  welfare?: Welfare;

  spouse?: Spouse;
  children?: Child[];

  accountDataView$: Observable<DynamicCustomDataBase<string | number | Date>[]> =
    accountDataView();
  welfareDataView$: Observable<
    DynamicCustomDataBase<string | number | Date>[]
  > = welfareDataView();
  spouseDataView$: Observable<DynamicCustomDataBase<string | number | Date>[]> =
    spouseDataView();
  childDataView$: Observable<DynamicCustomDataBase<string>[]>[] = [
    childDataView(),
  ];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: AccountsService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.editUrl = `/users/edit/${this.route.snapshot.paramMap.get('id')}`;

      this.account = data['account'];
      this.member = this.account?.member;
      this.welfare = this.member?.welfare;
      this.spouse = this.account?.spouse;
      this.children = this.account?.children;

      this.accountDataView$.forEach(
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
        this.welfareDataView$.forEach(
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
        this.spouseDataView$.forEach(
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
            this.childDataView$.push(childDataView());
          }
        });
        this.childDataView$.forEach(
          (
            dataViewGroup: Observable<DynamicCustomDataBase<string>[]>,
            dataViewGoupIndex
          ) => {
            dataViewGroup.forEach(
              (dataView: DynamicCustomDataBase<string>[]) => {
                if (dataView) {
                  dataView.forEach(
                    (view: DynamicCustomDataBase<string | number | Date>) => {
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
    });
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
