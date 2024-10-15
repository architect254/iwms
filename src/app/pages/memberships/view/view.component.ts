import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DynamicViewComponent } from '../../../shared/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/data-view/view.service';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { PageDirective } from '../../../shared/page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import { Membership } from '../model';
import { MembershipService } from '../memberships.service';
import { membershipDataView } from './model';

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
  listUrl: string = '/memberships';

  membership?: Membership;

  membershipDataView$: Observable<
    DynamicCustomDataBase<string | number | Date>[]
  > = membershipDataView();

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: MembershipService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.editUrl = `/memberships/edit/${this.route.snapshot.paramMap.get(
        'id'
      )}`;

      this.membership = data['membership'];

      if (this.membership) {
        this.membershipDataView$.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view) {
                  view.value = (
                    this.membership as unknown as Record<
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
