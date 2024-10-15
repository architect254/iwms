import { Component, SkipSelf } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { GridDirective } from '../../../shared/grid-container/grid-container.directive';
import { GridComponent } from '../../../shared/grid/grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { GridSearchComponent } from '../../../shared/grid/grid-search/grid-search.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { AuthService } from '../../../core/services/auth.service';
import { FilterOption, GridColumn } from '../../../shared/grid/model';
import { FILTER_OPTIONS, FilterRequestDto, GRID_COLUMNS } from './model';
import { MembershipService } from '../memberships.service';

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
export class ListComponent extends GridDirective {
  columns: GridColumn[] = GRID_COLUMNS;
  filters: FilterOption[] = FILTER_OPTIONS;

  defaultSortColumn!: string;
  defaultSortColumnDirection!: 'asc' | 'desc';

  data: any[] = [];

  declare filtersDTO: FilterRequestDto;
  declare filterRequest: [string, string][];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: MembershipService
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
        .getMemberships(page, take, filterRequest)
        .subscribe((memberships) => {
          this.data = memberships.map((membership) => {
            return {
              id: membership.id,
              name: `${membership.member.first_name} ${membership.member.last_name}`,
              phone_number: membership.member.phone_number,
              email: membership.member.email,
              status: membership.status,
              role: membership.membership_role,
              create_date: membership.create_date,
              update_date: membership.update_date,
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
