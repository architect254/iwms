import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Data } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ListPage } from '../../../shared/directives/list-page/list-page.directive';
import { GridSearchComponent } from '../../../shared/views/grid/grid-search/grid-search.component';
import { AccountsService } from '../accounts.service';
import {
  GRID_COLUMNS,
  FILTER_OPTIONS,
  STATUS,
  ACTIONS,
  FilterRequestDto,
} from './model';
import { GridComponent } from '../../../shared/views/grid/grid.component';
import {
  GridColumn,
  FilterOption,
  StatusConfig,
  Action,
} from '../../../shared/views/grid/model';

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
export class ListComponent extends ListPage {
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

    private service: AccountsService
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

  override fetchData(
    page: number,
    take: number,
    filterRequest: [string, string][]
  ) {
    this.$subscriptions$.add(
      this.service
        .getAccounts(page, take, filterRequest)
        .subscribe((accounts) => {
          this.data = accounts.map((account) => {
            return {
              id: account.id,
              name: `${account.first_name} ${account.last_name}`,
              id_number: account.id_number,
              phone_number: account.phone_number,
              email: account.email,
              profile_image: account.profile_image_url,
              type: account.type,
              status: account.status,
              welfare: account.member?.welfare?.name,
              role: account.member?.role,
              m_status: account.member?.status,
              create_date: account.create_date,
              update_date: account.update_date,
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
