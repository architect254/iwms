import { Component, SkipSelf } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ListPage } from '../../../shared/directives/list-page/list-page.directive';
import { GridSearchComponent } from '../../../shared/views/grid/grid-search/grid-search.component';
import { GridComponent } from '../../../shared/views/grid/grid.component';
import { GridColumn, FilterOption } from '../../../shared/views/grid/model';
import { MembersService } from '../members.service';
import { buildAccountName } from '../model';
import { GRID_COLUMNS, FILTER_OPTIONS, FilterRequestDto } from './model';

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
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  columns: GridColumn[] = GRID_COLUMNS;
  filters: FilterOption[] = FILTER_OPTIONS;

  defaultSortColumn!: string;
  defaultSortColumnDirection!: 'asc' | 'desc';

  data: any[] = [];

  declare filtersDTO: FilterRequestDto;
  declare filterRequest: [string, string][];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: MembersService
  ) {
    super(authService);
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.fetchData(this.page, this.take, this.filterRequest);
  }

  fetchData(page: number, take: number, filterRequest: [string, string][]) {
    this.$subscriptions$.add(
      this.service
        .getMembers(page, take, filterRequest)
        .subscribe((members) => {
          this.data = members.map((member) => {
            return {
              id: member.id,
              name: buildAccountName(member.account),
              phone_number: member.account?.phone_number,
              email: member.account?.email,
              status: member.account?.status,
              role: member.role,
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
