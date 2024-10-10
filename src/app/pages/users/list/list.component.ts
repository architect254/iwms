import { Component, Inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { Observable, of } from 'rxjs';

import { UsersService } from '../users.service';
import { User } from '../user.model';

import { GridContainerDirective } from '../../../shared/grid-container/grid-container.directive';
import {
  ColumnProperties,
  StatusProperties,
  ActionProperties,
  GridComponent,
  FilterColumn,
} from '../../../shared/grid/grid.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
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
export class ListComponent extends GridContainerDirective {
  pageTitle: string = '';
  columnProperties: ColumnProperties[] = MOCK.COLUMNS as ColumnProperties[];
  filterColumns: FilterColumn[] = MOCK.FILTER_COLUMNS as FilterColumn[];
  statusProperties: StatusProperties = MOCK.STATUS;
  actionProperties: ActionProperties = MOCK.ACTIONS;
  defaultSortColumn!: string;
  defaultSortColumnDirection!: 'asc' | 'desc';

  data: any[] = [];

  minRentCtrl: FormControl = new FormControl();

  filterOptions = [{ key: 1, label: 'option' }];

  constructor(private _usersService: UsersService) {
    super();
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._usersService.getUsers().subscribe((users) => {
      this.data = users.map((user) => {
        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          id_number: user.id_number,
          phone_number: user.phone_number,
          email: user.email,
          profile_image: user.profile_image_url,
          role: user.role,
          group: user.membership?.welfare?.name,
          status: user.membership?.status || 'Active',
          create_date: user.create_date,
          update_date: user.update_date,
        };
      });
    });
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
export const MOCK = {
  FILTER_COLUMNS: [
    {
      key: 'name',
      label: 'Full Name',
      position: 1,
      type: 'string',
      icon: 'badge',
      combinator: 'Includes',
    },
    {
      key: 'id_number',
      label: 'National ID Number',
      position: 2,
      type: 'number',
      icon: 'fingerprint',
      combinator: 'Includes',
    },
    {
      key: 'birth_date',
      label: 'Date of Birth',
      position: 3,
      type: 'date',
      icon: 'cake',
      combinator: 'Is',
    },
    {
      key: 'phone_number',
      label: 'Phone Number',
      position: 4,
      type: 'number',
      icon: 'call_log',
      combinator: 'Is',
    },
    {
      key: 'email',
      label: 'Email',
      position: 5,
      type: 'string',
      icon: 'email',
      combinator: 'Includes',
    },
    {
      key: 'role',
      label: 'User Role',
      position: 6,
      type: 'list',
      icon: 'checklist',
      combinator: 'Is',
      options: [
        { key: 'Site Admin', value: 'Site Admin' },
        { key: 'Welfare Manager', value: 'Welfare Manager' },
        { key: 'Welfare Accountant', value: 'Welfare Accountant' },
        { key: 'Welfare Secretary', value: 'Welfare Secretary' },
        { key: 'Welfare Client Member', value: 'Welfare Client Member' },
      ],
      colors: {
        'Site Admin': 'red',
        'Welfare Manager': 'orange',
        'Welfare Accountant': 'blue',
        'Welfare Secretary': 'purple',
        'Welfare Client Member': 'green',
      },
    },
    {
      key: 'group',
      label: 'Welfare Group',
      position: 7,
      type: 'string',
      icon: 'group',
      combinator: 'Is',
    },
  ],
  COLUMNS: [
    {
      key: 'select',
      label: 'Select',
      position: 0,
      type: 'select',
      width: '250px',
    },
    {
      key: 'name',
      label: 'Full Name',
      position: 1,
      type: 'string',
      width: '250px',
    },
    {
      key: 'id_number',
      label: 'National ID Number',
      position: 2,
      type: 'number',
      width: '250px',
    },
    {
      key: 'phone_number',
      label: 'Phone Number',
      position: 3,
      type: 'number',
      width: '250px',
    },
    {
      key: 'email',
      label: 'Email',
      position: 4,
      type: 'string',
      width: '250px',
    },
    {
      key: 'role',
      label: 'User Role',
      position: 5,
      type: 'status',
      width: '250px',
    },
    {
      key: 'welfare',
      label: 'Welfare Group Name',
      position: 6,
      type: 'string',
      width: '250px',
    },
    {
      key: 'status',
      label: 'Membership Status',
      position: 7,
      type: 'status',
      width: '250px',
    },
    {
      key: 'create_date',
      label: 'Date First Created',
      position: 8,
      type: 'date',
      width: '250px',
    },
    {
      key: 'update_date',
      label: 'Date Last Updated',
      position: 9,
      type: 'date',
      width: '250px',
    },
  ],
  STATUS: {
    status: {
      labels: {
        'Site Admin': 'Site Admin',
        'Welfare Manager': 'Welfare Manager',
        'Welfare Accountant': 'Welfare Accountant',
        'Welfare Secretary': 'Welfare Secretary',
        'Welfare Client Member': 'Welfare Client Member',
        Active: 'Active',
        Inactive: 'Inactive',
      },
      colors: {
        'Site Admin': 'red',
        'Welfare Manager': 'orange',
        'Welfare Accountant': 'blue',
        'Welfare Secretary': 'purple',
        'Welfare Client Member': 'green',
        Active: 'green',
        Inactive: 'red',
      },
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
