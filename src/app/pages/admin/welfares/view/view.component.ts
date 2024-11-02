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
export class ViewComponent extends ViewPage {
  override listUrl: string = '/welfare-groups';

  welfare?: Welfare;
  chairperson!: Member;
  treasurer!: Member;
  secretary!: Member;
  members?: Member[];

  welfareDataView = inject(WELFARE_DATA_VIEW);
  chairpersonDataView = inject(CHAIRPERSON_DATA_VIEW);
  treasurerDataView = inject(TREASURER_DATA_VIEW);
  secretaryDataView = inject(SECRETARY_DATA_VIEW);

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
        this.chairperson = this.welfare?.chairperson!;
        this.treasurer = this.welfare?.treasurer!;
        this.secretary = this.welfare?.secretary!;
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
            console.log('chair', this.chairperson);
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
            console.log('ctres', this.treasurer);
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
            console.log('sec', this.secretary);
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
        }
      })
    );
  }

  viewAllMembers() {
    this.router.navigate(['/members'], {
      state: { welfareId: this.welfare?.id },
    });
  }

  createMember() {
    this.router.navigate(['/members/add'], {
      state: { welfareId: this.welfare?.id },
    });
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
