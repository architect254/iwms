import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ListPage } from '../../../shared/directives/list-page/list-page.directive';
import { GridSearchComponent } from '../../../shared/views/grid/grid-search/grid-search.component';
import { GridComponent } from '../../../shared/views/grid/grid.component';
import {
  GridColumn,
  FilterOption,
  Action,
  StatusConfig,
  Filter,
} from '../../../shared/views/grid/model';
import { MembersService } from '../members.service';
import { actions, columns, status, filters, FilterRequest } from './model';

export const COLUMNS = new InjectionToken<GridColumn[]>('grid columns');

export const FILTERS = new InjectionToken<FilterOption[]>(
  'grid filter columns'
);

export const STATUS = new InjectionToken<StatusConfig>('grid status config');

export const ACTIONS = new InjectionToken<Action[]>('grid actions');

@Component({
  selector: 'iwms-list',
  standalone: true,
  imports: [
    ScrollingModule,
    AsyncPipe,
    HeaderComponent,
    GridComponent,
    GridSearchComponent,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: COLUMNS, useValue: columns },
    { provide: FILTERS, useValue: filters },
    { provide: STATUS, useValue: status },
    { provide: ACTIONS, useValue: actions },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  columns = inject(COLUMNS);
  filters = inject(FILTERS);
  status = inject(STATUS);
  actions = inject(ACTIONS);

  welfareId!: string | number;

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: MembersService
  ) {
    super(authService);
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((queryParams) => {
        this.welfareId = queryParams.get('welfareId')!;
      })
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.fetchData(this.page, this.take);
  }

  fetchData(page: number, take: number, filters?: Filter[]) {
    const action = this.welfareId
      ? this.service.getMembersByWelfare(this.welfareId, page, take, filters)
      : this.service.getMembers(page, take, filters);
    this.subscriptions.add(
      action.subscribe((members) => {
        this.data = members
          .filter((member) => !!member.account)
          .map((member) => {
            return {
              id: member.account?.id,
              name: member.account?.name,
              gender: member.account?.gender,
              id_number: member.account?.id_number,
              phone_number: member.account?.phone_number,
              email: member.account?.email,
              class: member.account?.class,
              state: member.account?.state,
              role: member.role,
              status: member.status,
              create_date: member.create_date,
              update_date: member.update_date,
            };
          });
      })
    );
  }

  override setTwitterCardMeta(): void {
    this.setMeta([
      {
        name: `twitter:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:card`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:site`,
        content: `https://www.iwms.com`,
      },
      {
        name: `twitter:creator`,
        content: `Jared Bada - Code Links Industries Ltd`,
      },
    ]);
  }

  override setFacebookOpenGraphMeta(): void {
    this.setMeta([
      {
        name: `og:type`,
        content: `website`,
      },
      {
        name: `og:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:url`,
        content: `https://www.iwms.com`,
      },
      {
        name: `og:site_name`,
        content: `Integrated Welfare Management System`,
      },
      {
        name: `og:locale`,
        content: `en_US`,
      },
      {
        name: `og:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:image:type`,
        content: `image/png`,
      },
      {
        name: `og:image:width`,
        content: `1360`,
      },
      {
        name: `og:image:height`,
        content: `720`,
      },
      {
        name: `og:image:secure_url`,
        content: `@LoremIpsum`,
      },
    ]);
  }

  override setDefaultMetaAndTitle(): void {
    this.setTitle(
      `Integrated Welfare Management System - Welfare Management Information System | Integrated Welfare Management System`
    );
    this.setMeta([
      {
        name: `description`,
        content: `@LoremIpsum`,
      },
      {
        name: `keywords`,
        content: `@LoremIpsum`,
      },
    ]);
  }
}
