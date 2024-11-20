import { AsyncPipe, JsonPipe, SlicePipe } from "@angular/common";
import { InjectionToken, Component, inject, SkipSelf } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Data } from "@angular/router";
import { Observable } from "rxjs";
import { Contribution } from "../../../core/entities/contribution.entity";
import { Member } from "../../../core/entities/member.entity";
import { Welfare } from "../../../core/entities/welfare.entity";
import { AuthService } from "../../../core/services/auth.service";
import { DynamicViewComponent } from "../../../shared/components/data-view/view.component";
import { DynamicCustomDataBase } from "../../../shared/components/data-view/view.service";
import { ValueType } from "../../../shared/components/form-control/model";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ViewPage } from "../../../shared/directives/view-page/view-page.directive";
import { WelfaresService } from "../welfares/welfares.service";
import { welfareDataView, memberDataView, contributionDataView } from "./model";

export const WELFARE_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Welfare data view');

export const CHAIRPERSON_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Chairperson data view');
export const TREASURER_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Treaurer data view');
export const SECRETARY_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Secretary data view');
export const MEMBER_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('member data view');

export const CONTRIBUTION_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Contribution data view');

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
    { provide: WELFARE_DATA_VIEW, useFactory: welfareDataView },
    { provide: CHAIRPERSON_DATA_VIEW, useFactory: memberDataView },
    { provide: TREASURER_DATA_VIEW, useFactory: memberDataView },
    { provide: SECRETARY_DATA_VIEW, useFactory: memberDataView },
    { provide: MEMBER_DATA_VIEW, useFactory: memberDataView },
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class HomeViewComponent extends ViewPage {
  welfare?: Welfare;
  chairperson!: Member;
  treasurer!: Member;
  secretary!: Member;

  members?: Member[];
  contributions?: Contribution[];

  welfareDataView = inject(WELFARE_DATA_VIEW);
  chairpersonDataView = inject(CHAIRPERSON_DATA_VIEW);
  treasurerDataView = inject(TREASURER_DATA_VIEW);
  secretaryDataView = inject(SECRETARY_DATA_VIEW);

  memberDataView = [inject(MEMBER_DATA_VIEW)];

  contributionDataView = [inject(MEMBER_DATA_VIEW)];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: WelfaresService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        this.welfare = data['welfare'];
        this.chairperson = this.welfare?.chairperson!;
        this.treasurer = this.welfare?.treasurer!;
        this.secretary = this.welfare?.secretary!;
        this.members = this.welfare?.members;
        this.contributions = this.welfare?.contributions;

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
                    )?.[view.key] as string | number | Date;
                  }
                }
              );
            }
          );

          if (this.chairperson) {
            this.chairpersonDataView.forEach(
              (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
                dataView.forEach(
                  (view: DynamicCustomDataBase<string | number | Date>) => {
                    if (view) {
                      view.value = (
                        this.chairperson as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )?.[view.key] as string | number | Date;
                    }
                  }
                );
              }
            );
          }
          if (this.treasurer) {
            this.treasurerDataView.forEach(
              (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
                dataView.forEach(
                  (view: DynamicCustomDataBase<string | number | Date>) => {
                    if (view) {
                      view.value = (
                        this.treasurer as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )?.[view.key] as string | number | Date;
                    }
                  }
                );
              }
            );
          }
          if (this.secretary) {
            this.secretaryDataView.forEach(
              (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
                dataView.forEach(
                  (view: DynamicCustomDataBase<string | number | Date>) => {
                    if (view) {
                      view.value = (
                        this.secretary as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )?.[view.key] as string | number | Date;
                    }
                  }
                );
              }
            );
          }
          if (this.members?.length) {
            this.members.forEach((member, memberIndex) => {
              if (memberIndex > 0) {
                this.memberDataView.push(memberDataView());
              }
            });

            this.memberDataView.forEach(
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
                            this.members as unknown as Record<
                              string,
                              ValueType
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
            this.contributions.forEach((contribution, contributionIndex) => {
              if (contributionIndex > 0) {
                this.contributionDataView.push(contributionDataView());
              }
            });

            this.contributionDataView.forEach(
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
                              ValueType
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
        }
      })
    );
  }

  viewAllMembers() {
    this.router.navigate(['/members'], {
      queryParams: { welfareId: this.welfare?.id },
    });
  }

  createMember() {
    this.router.navigate(['/members/add'], {
      state: { welfareId: this.welfare?.id },
    });
  }

  viewAllContributions() {
    this.router.navigate(['/contributions'], {
      queryParams: { welfareId: this.welfare?.id },
    });
  }

  createContribution() {
    this.router.navigate(['/contributions/add'], {
      state: { welfareId: this.welfare?.id },
    });
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
