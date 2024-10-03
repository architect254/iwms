import { Component, Inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AsyncPipe, DOCUMENT } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { Observable, of } from 'rxjs';

import { AccountsService } from '../accounts.service';
import { Account } from '../account';

import { GridContainerDirective } from '../../../shared/grid-container/grid-container.directive';
import {
  ColumnProperties,
  StatusProperties,
  ActionProperties,
  GridComponent,
} from '../../../shared/grid/grid.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { GridSearchComponent } from '../../../shared/grid/grid-search/grid-search.component';
import { HeaderComponent } from '../../../shared/header/header.component';

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
export class ListComponent extends GridContainerDirective {
  pageTitle: string = '';
  columnProperties: ColumnProperties[] = MOCK.COLUMNS as ColumnProperties[];
  statusProperties: StatusProperties = MOCK.STATUS;
  actionProperties: ActionProperties = MOCK.ACTIONS;
  defaultSortColumn!: string;
  defaultSortColumnDirection!: 'asc' | 'desc';

  accounts$: Observable<Account[]> = of([]);

  data = [
    {
      name: 'jared',
      age: 21,
      status: 'stopped',
      action: 'run',
    },
    {
      name: 'jared',
      age: 21,
      status: 'waiting',
      action: 'run',
    },
    {
      name: 'jared',
      age: 21,
      status: 'running',
      action: 'stop',
    },
  ];

  minRentCtrl: FormControl = new FormControl();

  filterOptions = [{ key: 1, label: 'option' }];
  
  constructor(
    override activatedRoute: ActivatedRoute,
    override router: Router,
    private _usersService: AccountsService
  ) {
    super(activatedRoute, router);
    this.activatedRoute.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this._usersService.selectAllMembershipsDummy();
  }

  onSelectFilterOption(type: any) {}

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
      `Integrated Welfare Management System - Home Rentals | Integrated Welfare Management System`
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
export const MOCK = {
  COLUMNS: [
    {
      key: 'select',
      label: 'Select',
      position: 0,
      type: 'select',
      width: '250px',
    },
    { key: 'name', label: 'Name', position: 1, type: 'string', width: '250px' },
    { key: 'age', label: 'Age', position: 2, type: 'number', width: '250px' },
    {
      key: 'status',
      label: 'Status',
      position: 20,
      type: 'status',
      width: '250px',
    },
    {
      key: 'action',
      label: 'Action',
      position: 21,
      type: 'action',
      width: '250px',
    },
  ],
  STATUS: {
    status: {
      labels: { stopped: 'STOPPED', waiting: 'WAITING', running: 'RUNNING' },
      colors: { stopped: 'red', waiting: 'orange', running: 'green' },
    },
  },
  ACTIONS: {
    action: {
      actions: [
        {
          name: 'click',
          implementation: () => {
            undefined;
          },
        },
      ],
    },
  },
};
