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
import { FinanceService } from '../finance.service';
import { memberContributionDataView } from './model';
import {
  BereavedMemberContribution,
  Contribution,
  DeceasedMemberContribution,
  MembershipContribution,
  MembershipReactivationContribution,
  MonthlyContribution,
} from '../../../../core/entities/contribution.entity';

export const MEMBER_CONTRIBUTION_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Member contribution data view');

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [
    {
      provide: MEMBER_CONTRIBUTION_DATA_VIEW,
      useFactory: memberContributionDataView,
    },
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends ViewPage {
  contribution!:
    | Contribution
    | MembershipContribution
    | MonthlyContribution
    | BereavedMemberContribution
    | DeceasedMemberContribution
    | MembershipReactivationContribution;

  memberContributionDataView = inject(MEMBER_CONTRIBUTION_DATA_VIEW);

  override updateUrl: string = '';
  constructor(
    @SkipSelf() override authService: AuthService,
    private service: FinanceService
  ) {
    super()

  }
  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        this.contribution = data['contribution'];

        this.memberContributionDataView.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view && view.key != 'from' && view.key != 'to') {
                  view.value = (
                    this.contribution as unknown as Record<
                      string,
                      string | number | Date
                    >
                  )?.[view.key] as string | number | Date;
                } else {
                  view.value = (this.contribution as unknown as any)?.[
                    view.key
                  ].name;
                }
                if (view.key == 'amount') {
                  view.value = (
                    this.contribution as unknown as any
                  )?.transaction.amount;
                }
                if (!view.value) {
                  view.visible = false;
                }
              }
            );
          }
        );
      })
    );
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
