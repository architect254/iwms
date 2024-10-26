import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
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
  getFilterOptions,
  getGridColumns,
  getToggleOptions,
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
  'Header toggle options'
);

export const FILTERS = new InjectionToken<FilterOption[]>('Grid filters');

export const COLUMNS = new InjectionToken<GridColumn[]>('Grid columns');

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
    { provide: TOGGLE_OPTIONS, useFactory: getToggleOptions },
    { provide: FILTERS, useFactory: getFilterOptions },
    { provide: COLUMNS, useFactory: getGridColumns },
    { provide: LABELS, useValue: statusLabels },
    { provide: COLORS, useValue: statusColors },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  toggleOptions = inject(TOGGLE_OPTIONS);

  filters = inject(FILTERS);
  columns = inject(COLUMNS);
  labels = inject(LABELS);
  colors = inject(COLORS);

  actions = [new Action('', '', () => {})];

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: UsersService,
    private injector: Injector
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
        case 'all':
          this.filters = inject(FILTERS);
          this.columns = inject(COLUMNS);
          break;

        default:
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
