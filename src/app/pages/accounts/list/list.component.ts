import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ApplicationRef,
  Component,
  ComponentRef,
  EnvironmentInjector,
  inject,
  InjectionToken,
  Injector,
  runInInjectionContext,
  SkipSelf,
} from '@angular/core';
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
  actions,
  adminUserAccountColumns,
  adminUserAccountfilters,
  clientUserAccountColumns,
  clientUserAccountfilters,
  status,
  toggleOptions,
  userAccountColumns,
  userAccountFilters,
} from './model';
import { GridComponent } from '../../../shared/views/grid/grid.component';
import {
  GridColumn,
  FilterOption,
  StatusConfig,
  Action,
  Filter,
} from '../../../shared/views/grid/model';
import {
  AdminUserAccount,
  ClientUserAccount,
} from '../../../core/models/entities';
import {
  ButtonToggleComponent,
  ToggleOption,
} from '../../../shared/components/button-toggle/button-toggle.component';

export const TOGGLE_OPTIONS = new InjectionToken<ToggleOption[]>(
  'button toggle options'
);

export const USER_ACCOUNT_FILTERS = new InjectionToken<FilterOption[]>(
  'grid filter columns'
);

export const USER_ACCOUNT_COLUMNS = new InjectionToken<GridColumn[]>(
  'grid columns'
);

export const ADMIN_USER_ACCOUNT_FILTERS = new InjectionToken<FilterOption[]>(
  'grid filter columns'
);

export const ADMIN_USER_ACCOUNT_COLUMNS = new InjectionToken<GridColumn[]>(
  'grid columns'
);

export const CLIENT_USER_ACCOUNT_FILTERS = new InjectionToken<FilterOption[]>(
  'grid filter columns'
);

export const CLIENT_USER_ACCOUNT_COLUMNS = new InjectionToken<GridColumn[]>(
  'grid columns'
);

export const STATUS = new InjectionToken<StatusConfig>('grid status config');

export const ACTIONS = new InjectionToken<
  Action<AdminUserAccount | ClientUserAccount>[]
>('grid actions');


@Component({
  selector: 'iwms-list',
  standalone: true,
  imports: [
    ScrollingModule,
    AsyncPipe,
    HeaderComponent,
    ButtonToggleComponent,
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
    { provide: TOGGLE_OPTIONS, useValue: toggleOptions },
    { provide: USER_ACCOUNT_FILTERS, useValue: userAccountFilters },
    { provide: USER_ACCOUNT_COLUMNS, useValue: userAccountColumns },
    { provide: ADMIN_USER_ACCOUNT_FILTERS, useValue: adminUserAccountfilters },
    { provide: ADMIN_USER_ACCOUNT_COLUMNS, useValue: adminUserAccountColumns },
    {
      provide: CLIENT_USER_ACCOUNT_FILTERS,
      useValue: clientUserAccountfilters,
    },
    {
      provide: CLIENT_USER_ACCOUNT_COLUMNS,
      useValue: clientUserAccountColumns,
    },
    { provide: STATUS, useValue: status },
    { provide: ACTIONS, useValue: actions },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  toggleOptions = inject(TOGGLE_OPTIONS);

  filters = inject(USER_ACCOUNT_FILTERS);
  columns = inject(USER_ACCOUNT_COLUMNS);
  status = inject(STATUS);
  actions = inject(ACTIONS);

  toggledOption: ToggleOption = toggleOptions[0];

  protected override type: string = toggleOptions[0].value;

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: AccountsService,
    private injector: Injector
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onToggle(option: ToggleOption) {
    this.toggledOption = option;
    this.type = option.value;
    runInInjectionContext(this.injector, () => {
      switch (this.toggledOption.value) {
        case 'admins':
          this.filters = inject(ADMIN_USER_ACCOUNT_FILTERS);
          this.columns = inject(ADMIN_USER_ACCOUNT_COLUMNS);
          break;

        case 'clients':
          this.filters = inject(CLIENT_USER_ACCOUNT_FILTERS);
          this.columns = inject(CLIENT_USER_ACCOUNT_COLUMNS);
          break;

        case 'all':
          this.filters = inject(USER_ACCOUNT_FILTERS);
          this.columns = inject(USER_ACCOUNT_COLUMNS);
          break;

        default:
          break;
      }
      this.cdr.detectChanges();
      this.doRefresh();
    });
  }

  override fetchData(
    page: number,
    take: number,
    type: string,
    filters?: Filter[]
  ) {
    this.subscriptions.add(
      this.service
        .getAccounts(page, take, type, filters)
        .subscribe((accounts) => {
          this.data = accounts.map((account) => {
            return {
              id: account.id,
              name: account.name,
              gender: account.gender,
              id_number: account.id_number,
              phone_number: account.phone_number,
              email: (account as AdminUserAccount).email,
              profile_image: account?.profile_image,
              type: account.type,
              state: account.state,
              welfare: (account as ClientUserAccount)?.welfare?.name,
              role: (account as ClientUserAccount).role,
              status: (account as ClientUserAccount)?.status,
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
