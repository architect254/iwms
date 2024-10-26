import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
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
import { UsersService } from '../users.service';
import {
  adminToggleOptions,
  allMembersColumns,
  allMembersFilters,
  allUsersColumns,
  allUsersFilters,
  bereavedMembersColumns,
  bereavedMembersFilters,
  deactivatedMembersColumns,
  deactivatedMembersFilters,
  deceasedMembersColumns,
  deceasedMembersFilters,
  statusColors,
  statusLabels,
} from './model';
import { GridComponent } from '../../../shared/views/grid/grid.component';
import {
  GridColumn,
  FilterOption,
  Filter,
  StatusLabels,
  Action,
} from '../../../shared/views/grid/model';
import {
  ButtonToggleComponent,
  ToggleOption,
} from '../../../shared/components/button-toggle/button-toggle.component';
import { Member } from '../entities/member.entity';

export const TOGGLE_OPTIONS = new InjectionToken<ToggleOption[]>(
  'User toggle options for header'
);

export const ALL_USERS_FILTERS = new InjectionToken<FilterOption[]>(
  'All users grid filters'
);
export const ALL_MEMBERS_FILTERS = new InjectionToken<FilterOption[]>(
  'All members grid filters'
);
export const BEREAVED_MEMBERS_FILTERS = new InjectionToken<FilterOption[]>(
  'Bereaved members grid filters'
);
export const DECEASED_MEMBERS_FILTERS = new InjectionToken<FilterOption[]>(
  'Deceased members grid filters'
);
export const DEACTIVATED_MEMBERS_FILTERS = new InjectionToken<FilterOption[]>(
  'Deceased members grid filters'
);

export const ALL_USERS_COLUMNS = new InjectionToken<GridColumn[]>(
  'All users grid columns'
);
export const ALL_MEMBERS_COLUMNS = new InjectionToken<GridColumn[]>(
  'Active members grid columns'
);
export const BEREAVED_MEMBERS_COLUMNS = new InjectionToken<GridColumn[]>(
  'Bereaved members grid columns'
);
export const DECEASED_MEMBERS_COLUMNS = new InjectionToken<GridColumn[]>(
  'Deceased members grid columns'
);
export const DEACTIVATED_MEMBERS_COLUMNS = new InjectionToken<GridColumn[]>(
  'Deceased members grid columns'
);
export const LABELS = new InjectionToken<StatusLabels>('Grid status labels');

export const COLORS = new InjectionToken<StatusLabels>('Grid status colors');

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
    { provide: TOGGLE_OPTIONS, useValue: adminToggleOptions },
    { provide: ALL_USERS_FILTERS, useValue: allUsersFilters },
    { provide: ALL_MEMBERS_FILTERS, useValue: allMembersFilters },
    { provide: BEREAVED_MEMBERS_FILTERS, useValue: bereavedMembersFilters },
    { provide: DECEASED_MEMBERS_FILTERS, useValue: deceasedMembersFilters },
    {
      provide: DEACTIVATED_MEMBERS_FILTERS,
      useValue: deactivatedMembersFilters,
    },
    { provide: ALL_USERS_COLUMNS, useValue: allUsersColumns },
    { provide: ALL_MEMBERS_COLUMNS, useValue: allMembersColumns },
    { provide: BEREAVED_MEMBERS_COLUMNS, useValue: bereavedMembersColumns },
    { provide: DECEASED_MEMBERS_COLUMNS, useValue: deceasedMembersColumns },
    {
      provide: DEACTIVATED_MEMBERS_COLUMNS,
      useValue: deactivatedMembersColumns,
    },
    { provide: LABELS, useValue: statusLabels },
    { provide: COLORS, useValue: statusColors },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  toggleOptions = inject(TOGGLE_OPTIONS);

  filters = inject(ALL_USERS_FILTERS);
  columns = inject(ALL_USERS_COLUMNS);
  labels = inject(LABELS);
  colors = inject(COLORS);

  actions = [new Action('', '', () => {})];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: UsersService,
    private injector: EnvironmentInjector
  ) {
    super(authService);

    this.toggledOption = this.toggleOptions[0];
    this.toggledOptionValue = this.toggledOption.value;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onToggle(option: ToggleOption) {
    this.toggledOptionValue = option.value;
    runInInjectionContext(this.injector, () => {
      switch (this.toggledOptionValue) {
        case 'users':
          this.filters = inject(ALL_USERS_FILTERS);
          this.columns = inject(ALL_USERS_COLUMNS);
          break;

        case 'admins':
          this.filters = inject(ALL_USERS_FILTERS);
          this.columns = inject(ALL_USERS_COLUMNS);
          break;
        case 'members':
          this.filters = inject(ALL_MEMBERS_FILTERS);
          this.columns = inject(ALL_MEMBERS_COLUMNS);
          break;
        case 'active':
          this.filters = inject(ALL_MEMBERS_FILTERS);
          this.columns = inject(ALL_MEMBERS_COLUMNS);
          break;
        case 'bereaved':
          this.filters = inject(BEREAVED_MEMBERS_FILTERS);
          this.columns = inject(BEREAVED_MEMBERS_COLUMNS);
          break;
        case 'deceased':
          this.filters = inject(DECEASED_MEMBERS_FILTERS);
          this.columns = inject(DECEASED_MEMBERS_COLUMNS);
          break;
        case 'deactivated':
          this.filters = inject(DEACTIVATED_MEMBERS_FILTERS);
          this.columns = inject(DEACTIVATED_MEMBERS_COLUMNS);
          break;
      }
      this.cdr.detectChanges();
      this.doRefresh();
    });
  }

  override fetchData(
    type: string,
    page: number,
    take: number,
    filters?: Filter[]
  ) {
    this.subscriptions.add(
      this.service.getMany(type, page, take, filters).subscribe((accounts) => {
        this.data = accounts.map((account) => {
          return {
            id: account.id,
            name: account.name,
            gender: account.gender,
            id_number: account.id_number,
            phone_number: account.phone_number,
            email: account.email,
            profile_image: account?.profile_image,
            membership: account.membership,
            welfare: (account as Member)?.welfare?.name,
            role: (account as Member).role,
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
