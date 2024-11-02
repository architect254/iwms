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
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicViewComponent } from '../../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../../shared/components/data-view/view.service';
import { ValueType } from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ViewPage } from '../../../../shared/directives/view-page/view-page.directive';
import { AdminsService } from '../admins.service';
import { adminDataView } from './model';
import { Welfare } from '../../../../core/entities/welfare.entity';

export const ADMIN_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('Admin data view');

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [
    {
      provide: ADMIN_DATA_VIEW,
      useFactory: adminDataView,
    },
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends ViewPage {
  admin!: Admin;

  adminDataView = inject(ADMIN_DATA_VIEW);

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: AdminsService
  ) {
    super(authService);
  }
  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        this.admin = data['admin'];

        this.adminDataView.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view) {
                  view.value = (
                    this.admin as unknown as Record<
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
      })
    );
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
