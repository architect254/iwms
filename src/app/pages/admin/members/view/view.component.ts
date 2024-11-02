import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../../../../core/entities/admin.entity';
import { BereavedMember } from '../../../../core/entities/bereaved-member.entity';
import { Child } from '../../../../core/entities/child.entity';
import { DeactivatedMember } from '../../../../core/entities/deactivated-member.entity';
import { DeceasedMember } from '../../../../core/entities/deceased-member.entity';
import { Member } from '../../../../core/entities/member.entity';
import { Spouse } from '../../../../core/entities/spouse.entity';
import { Membership } from '../../../../core/entities/user.entity';
import { Welfare } from '../../../../core/entities/welfare.entity';
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicViewComponent } from '../../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../../shared/components/data-view/view.service';
import { ValueType } from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ViewPage } from '../../../../shared/directives/view-page/view-page.directive';
import { MembersService } from '../members.service';
import {
  welfareDataView,
  spouseDataView,
  childDataView,
  memberDataView,
} from './model';

export const MEMBER_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Member data view');

export const WELFARE_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Welfare data view');

export const SPOUSE_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Spouse data view');

export const CHILD_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Child data view');

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [
    {
      provide: MEMBER_DATA_VIEW,
      useFactory: memberDataView,
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
  member!:
    | Member
    | BereavedMember
    | DeceasedMember
    | DeactivatedMember;
  welfare?: Welfare;

  spouse?: Spouse;
  children?: Child[];

  memberDataView = inject(MEMBER_DATA_VIEW);
  welfareDataView = inject(WELFARE_DATA_VIEW);
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
        this.member = data['member'];
        this.welfare = (this.member as Member)?.welfare;
        this.spouse = (this.member as Member)?.spouse;
        this.children = (this.member as Member)?.children;

        this.memberDataView.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view) {
                  view.value = (
                    this.member as unknown as Record<
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
