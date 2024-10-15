import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DynamicViewComponent } from '../../../shared/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/data-view/view.service';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { PageDirective } from '../../../shared/page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import { welfareDataView } from './model';
import { Welfare } from '../../welfares/model';
import { WelfaresService } from '../welfares.service';
import { buildName } from '../../memberships/model';

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
  listUrl: string = '/welfare-grous';

  welfare?: Welfare;

  welfareDataView$: Observable<
    DynamicCustomDataBase<string | number | Date>[]
  > = welfareDataView();

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: WelfaresService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.editUrl = `/welfare-groups/edit/${this.route.snapshot.paramMap.get('id')}`;

      this.welfare = data['welfare'];

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

                  if (
                    view.key == 'manager' ||
                    view.key == 'accountant' ||
                    view.key == 'secretary'
                  ) {
                    view.value = buildName(
                      view.key,
                      this.welfare?.memberships!
                    );
                  }
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
