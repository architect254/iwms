import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DynamicViewComponent } from '../../../shared/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/data-view/view.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { PageDirective } from '../../../shared/page/page.directive';

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent extends PageDirective {
  pageTitle: string = '';
  editUrl: string = '';

  user!: {
    [key: string]:
      | string
      | number
      | Date
      | {
          [key: string]:
            | string
            | number
            | Date
            | { [key: string]: string | number | Date };
        }
      | { [key: string]: string | number | Date }[];
  };
  membership!: {
    [key: string]:
      | string
      | number
      | Date
      | { [key: string]: string | number | Date };
  };
  welfare!: { [key: string]: string | number | Date };

  spouse!: { [key: string]: string | number | Date };
  children!: { [key: string]: string | number | Date }[];

  userDataView$!: Observable<DynamicCustomDataBase<string | number | Date>[]>;
  welfareDataView$!: Observable<
    DynamicCustomDataBase<string | number | Date>[]
  >;
  spouseDataView$!: Observable<DynamicCustomDataBase<string | number | Date>[]>;
  childDataView$!: Observable<DynamicCustomDataBase<string>[]>[];

  constructor(private service: UsersService) {
    super();

    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.editUrl = `/users/edit/${this.route.snapshot.paramMap.get('id')}`;

      this.user = data['user'];
      this.membership = this.user['membership'] as {
        [key: string]: string | { [key: string]: string };
      };

      this.userDataView$ = this.service.getUserDataView();
      this.userDataView$.forEach(
        (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
          dataView.forEach(
            (view: DynamicCustomDataBase<string | number | Date>) => {
              if (view) {
                view.value =
                  (this.user[view.key] as string | number | Date) ||
                  (this.membership?.[view.key] as string);
              }
            }
          );
        }
      );

      this.welfare = this.membership?.['welfare'] as {
        [key: string]: string | number | Date;
      };
      if (this.welfare) {
        this.welfareDataView$ = this.service.getWelfareDataView();
        this.welfareDataView$.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view) {
                  view.value = this.welfare[view.key] as string | number | Date;
                }
              }
            );
          }
        );
      }

      this.spouse = this.user['spouse'] as unknown as {
        [key: string]: string | number | Date;
      };
      if (this.spouse) {
        this.spouseDataView$ = this.service.getSpouseDataView();
        this.spouseDataView$.forEach(
          (dataView: DynamicCustomDataBase<string | number | Date>[]) => {
            dataView.forEach(
              (view: DynamicCustomDataBase<string | number | Date>) => {
                if (view) {
                  view.value = this.spouse[view.key] as string | number | Date;
                }
              }
            );
          }
        );
      }
      this.children = this.user['children'] as {
        [key: string]: string | number | Date;
      }[];
      if (this.children?.length) {
        this.children.forEach((child, index) => {
          if (index == 0) {
            this.childDataView$ = [this.service.getChildDataView()];
          } else {
            this.childDataView$.push(this.service.getChildDataView());
          }
        });
        this.childDataView$.forEach(
          (
            dataViewGroup: Observable<DynamicCustomDataBase<string>[]>,
            dataViewGoupIndex
          ) => {
            dataViewGroup.forEach(
              (dataView: DynamicCustomDataBase<string>[]) => {
                if (dataView) {
                  dataView.forEach(
                    (view: DynamicCustomDataBase<string | number | Date>) => {
                      view.value = this.children[dataViewGoupIndex][view.key];
                    }
                  );
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
