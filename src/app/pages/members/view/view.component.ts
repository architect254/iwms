import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DynamicViewComponent } from '../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/components/data-view/view.service';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from '../../../shared/directives/page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import { Member } from '../model';
import { MembersService } from '../members.service';
import { memberDataView } from './model';
import { ValueType } from '../../../shared/components/form-control/control.component';

export const MEMBER_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('member data view');

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [{ provide: MEMBER_DATA_VIEW, useValue: memberDataView }],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends Page {
  pageTitle!: string;
  editUrl!: string;
  listUrl: string = '/members';

  member?: Member;

  memberDataView = inject(MEMBER_DATA_VIEW);

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: MembersService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.editUrl = `/members/edit/${this.route.snapshot.paramMap.get('id')}`;

      this.member = data['member'];

      if (this.member) {
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
                  )[view.key] as string | number | Date;
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
