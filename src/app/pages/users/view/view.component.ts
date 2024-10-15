import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DynamicViewComponent } from '../../../shared/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/data-view/view.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { Child, Spouse, User } from '../model';
import { PageDirective } from '../../../shared/page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import {
  childDataView,
  spouseDataView,
  userDataView,
  welfareDataView,
} from './model';
import { Membership } from '../../memberships/model';
import { Welfare } from '../../welfares/model';

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends PageDirective {
  pageTitle!: string;
  editUrl!: string;
  listUrl: string = '/users';

  user!: User;
  membership?: Membership;
  welfare?: Welfare;

  spouse?: Spouse;
  children?: Child[];

  userDataView$: Observable<DynamicCustomDataBase<string | number | Date>[]> =
    userDataView();
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

    private service: UsersService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.editUrl = `/users/edit/${this.route.snapshot.paramMap.get('id')}`;

      this.user = data['user'];
      this.membership = this.user?.membership;
      this.welfare = this.membership?.welfare;
      this.spouse = this.user?.spouse;
      this.children = this.user?.children;

      this.userDataView$.forEach(
        (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
          dataView.forEach(
            (view: DynamicCustomDataBase<string | number | Date>) => {
              if (view) {
                view.value =
                  ((
                    this.user as unknown as Record<
                      string,
                      string | number | Date
                    >
                  )[view.key] as string | number | Date) ||
                  ((
                    this.membership as unknown as Record<
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
