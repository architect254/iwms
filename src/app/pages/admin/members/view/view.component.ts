import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
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
  memberContributionDataView,
} from './model';
import { MatIconModule } from '@angular/material/icon';
import { Contribution } from '../../../../core/entities/contribution.entity';
import { MatButtonModule } from '@angular/material/button';

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

export const MEMBER_CONTRIBUTION_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Member contribution data view');

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    DynamicViewComponent,
    JsonPipe,
    SlicePipe,
    MatIconModule,
    MatButtonModule,
  ],
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
    {
      provide: MEMBER_CONTRIBUTION_DATA_VIEW,
      useFactory: memberContributionDataView,
    },
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends ViewPage {
  member!: Member | BereavedMember | DeceasedMember | DeactivatedMember;
  welfare?: Welfare;

  spouse?: Spouse;
  children?: Child[];

  contributions?: Contribution[];

  memberDataView = inject(MEMBER_DATA_VIEW);
  welfareDataView = inject(WELFARE_DATA_VIEW);
  spouseDataView = inject(SPOUSE_DATA_VIEW);
  childDataView = [inject(CHILD_DATA_VIEW)];
  memberContributionDataView = [inject(MEMBER_CONTRIBUTION_DATA_VIEW)];

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: MembersService
  ) {
    super()

  }
  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        this.member = data['member'];
        this.welfare = (this.member as Member)?.welfare;
        this.spouse = (this.member as Member)?.spouse;
        this.children = (this.member as Member)?.children;
        this.contributions = (this.member as Member)?.from;

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

        if (this.contributions?.length) {
          this.contributions.forEach((contribution, index) => {
            if (index > 0) {
              this.memberContributionDataView.push(
                memberContributionDataView()
              );
            }
          });
          this.memberContributionDataView.forEach(
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
                          this.contributions as unknown as Record<
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
  viewAllContributions() {
    this.router.navigate(['/contributions'], {
      relativeTo: this.route,
      queryParams: { memberId: this.member.id },
    });
  }
  createContribution() {
    this.router.navigate(['/contributions/add'], {
      relativeTo: this.route,
      queryParams: { memberId: this.member.id },
    });
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
