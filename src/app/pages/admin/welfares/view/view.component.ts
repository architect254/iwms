import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../../../../core/entities/member.entity';
import { Welfare } from '../../../../core/entities/welfare.entity';
import { getName } from '../../../../core/models/utils';
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicViewComponent } from '../../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../../shared/components/data-view/view.service';
import { ValueType } from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ViewPage } from '../../../../shared/directives/view-page/view-page.directive';
import { WelfaresService } from '../welfares.service';
import { welfareDataView, memberDataView } from './model';

export const WELFARE_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('welfare data view');

export const MEMBER_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('member data view');

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
    { provide: MEMBER_DATA_VIEW, useFactory: memberDataView },
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends ViewPage {
  override listUrl: string = '/welfare-groups';

  welfare?: Welfare;
  members?: Member[];

  welfareDataView = inject(WELFARE_DATA_VIEW);
  memberDataView = [inject(MEMBER_DATA_VIEW)];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: WelfaresService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        this.updateUrl = `/welfare-groups/${this.route.snapshot.paramMap.get(
          'id'
        )}/update`;

        this.welfare = data['welfare'];
        this.members = this.welfare?.members;

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

                    if (
                      view.key == 'manager' ||
                      view.key == 'accountant' ||
                      view.key == 'secretary'
                    ) {
                      view.value = getName(view.key, this.welfare?.members!);
                    }
                  }
                }
              );
            }
          );

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
        }
      })
    );
  }

  viewAllMembers() {
    this.router.navigate(['/members'], {
      queryParams: { welfareId: this.welfare?.id },
    });
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
