import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DynamicViewComponent } from '../../../shared/components/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/components/data-view/view.service';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from '../../../shared/directives/page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import { welfareDataView } from './model';
import { Welfare } from '../../welfares/model';
import { WelfaresService } from '../welfares.service';
import { buildName } from '../../members/model';
import { ValueType } from '../../../shared/components/form-control/control.component';

export const WELFARE_DATA_VIEW = new InjectionToken<
  Observable<DynamicCustomDataBase<ValueType>[]>
>('welfare data view');

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [{ provide: WELFARE_DATA_VIEW, useValue: welfareDataView }],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends Page {
  pageTitle!: string;
  editUrl!: string;
  listUrl: string = '/welfare-groups';

  welfare?: Welfare;

  welfareDataView = inject(WELFARE_DATA_VIEW);

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: WelfaresService
  ) {
    super(authService);

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.editUrl = `/welfare-groups/${this.route.snapshot.paramMap.get(
        'id'
      )}/update`;

      this.welfare = data['welfare'];

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

                  if (
                    view.key == 'manager' ||
                    view.key == 'accountant' ||
                    view.key == 'secretary'
                  ) {
                    view.value = buildName(view.key, this.welfare?.members!);
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
