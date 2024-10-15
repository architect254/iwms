import { Component, SkipSelf } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { UsersService } from '../users.service';

import { GridDirective } from '../../../shared/grid-container/grid-container.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { Data, RouterModule } from '@angular/router';
import { GridSearchComponent } from '../../../shared/grid/grid-search/grid-search.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { AuthService } from '../../../core/services/auth.service';
import {
  ACTIONS,
  FILTER_OPTIONS,
  FilterRequestDto,
  GRID_COLUMNS,
  STATUS,
} from './model';
import {
  GridColumn,
  StatusConfig,
  Action,
  FilterOption,
} from '../../../shared/grid/model';
import { GridComponent } from '../../../shared/grid/grid.component';

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
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends GridDirective {
  columns: GridColumn[] = GRID_COLUMNS;
  filters: FilterOption[] = FILTER_OPTIONS;
  status: StatusConfig = STATUS;
  actions: Action[] = ACTIONS;

  defaultSortColumn!: string;
  defaultSortColumnDirection!: 'asc' | 'desc';

  data: any[] = [];

  declare FilterRequestDto: FilterRequestDto;
  declare filterRequest: [string, string][];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: UsersService
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

  override fetchData(page: number, take: number, filterRequest: [string, string][]) {
    this.$subscriptions$.add(
      this.service.getUsers(page, take, filterRequest).subscribe((users) => {
        this.data = users.map((user) => {
          return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            id_number: user.id_number,
            phone_number: user.phone_number,
            email: user.email,
            profile_image: user.profile_image_url,
            user_role: user.user_role,
            status: user.membership?.status || 'Active',
            welfare: user.membership?.welfare?.name,
            membership_role: user.membership?.membership_role,
            create_date: user.create_date,
            update_date: user.update_date,
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
