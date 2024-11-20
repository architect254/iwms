import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { WelfaresService } from '../welfares.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Welfare } from '../../../../core/entities/welfare.entity';
import { getName } from '../../../../core/models/utils';
import { AuthService } from '../../../../core/services/auth.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ListPage } from '../../../../shared/directives/list-page/list-page.directive';
import { GridSearchComponent } from '../../../../shared/views/grid/grid-search/grid-search.component';
import { GridComponent } from '../../../../shared/views/grid/grid.component';
import {
  GridColumn,
  FilterOption,
  Filter,
} from '../../../../shared/views/grid/model';
import { columns, filters, actions } from './model';

export const COLUMNS = new InjectionToken<GridColumn[]>('grid columns');

export const FILTERS = new InjectionToken<FilterOption[]>(
  'grid filter columns'
);

export const ACTIONS = new InjectionToken<Action<Welfare>[]>('grid actions');

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
    { provide: ACTIONS, useValue: actions },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  columns = inject(COLUMNS);
  filterOptions = inject(FILTERS);
  actions = inject(ACTIONS);

  constructor(
    @SkipSelf() override authService: AuthService,

    private service: WelfaresService
  ) {
    super()

    // this.route.data.subscribe((data: Data) => {
    //   this.pageTitle = data['title'];
    // });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  fetchData(page: number, take: number, filters?: Filter[]) {
    this.subscriptions.add(
      this.service.getWelfares(page, take, filters).subscribe((welfares) => {
        this.data = welfares.map((welfare) => {
          return {
            id: welfare.id,
            name: welfare.name,
            phone_number: welfare.phone_number,
            email: welfare.email,
            hostname: welfare.hostname,
            chairperson: welfare.chairperson?.name,
            treasurer: welfare.treasurer?.name,
            secretary: welfare.secretary?.name,
            create_date: welfare.create_date,
            update_date: welfare.update_date,
          };
        });
      })
    );
  }

  doAdd() {
    this.router.navigate(['add'], {
      relativeTo: this.route,
    });
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
