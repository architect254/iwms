import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
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
import { actions, columns, FilterRequest, filters, status } from './model';
import { GridComponent } from '../../../shared/views/grid/grid.component';
import {
  GridColumn,
  FilterOption,
  StatusConfig,
  Action,
  Filter,
} from '../../../shared/views/grid/model';

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

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: AccountsService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override fetchData(page: number, take: number, filters?: Filter[]) {
    this.subscriptions.add(
      this.service.getAccounts(page, take, filters).subscribe((accounts) => {
        this.data = accounts.map((account) => {
          return {
            id: account.id,
            name: account.name,
            gender: account.gender,
            id_number: account.id_number,
            phone_number: account.phone_number,
            email: account.email,
            profile_image: account.profile_image_url,
            class: account.class,
            state: account.state,
            welfare: account.membership?.welfare?.name,
            role: account.membership?.role,
            status: account.membership?.status,
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
