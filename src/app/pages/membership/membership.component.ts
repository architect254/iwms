import { Component, Inject, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { PageDirective } from '../../shared/page/page.directive';
import { MembershipService } from './membership.service';
import { Membership } from '../membership-upsert/membership';
import { Title, Meta } from '@angular/platform-browser';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { GridContainerDirective } from '../../shared/grid-container/grid-container.directive';
import {
  ColumnProperties,
  StatusProperties,
  ActionProperties,
  GridComponent,
} from '../../shared/grid/grid.component';

@Component({
  selector: 'iwms-membership',
  standalone: true,
  imports: [ScrollingModule, AsyncPipe, GridComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss',
})
export class MembershipComponent extends GridContainerDirective {
  columnProperties: ColumnProperties[] = MOCK.COLUMNS as ColumnProperties[];
  statusProperties: StatusProperties = MOCK.STATUS;
  actionProperties: ActionProperties = MOCK.ACTIONS;
  defaultSortColumn!: string;
  defaultSortColumnDirection!: 'asc' | 'desc';

  memberships$: Observable<Membership[]> = of([]);

  data = [
    {
      name: 'jared',
      age: 21,
      status: 'stopped',
      action: 'stopped',
    },
    {
      name: 'jared',
      age: 21,
      status: 'stopped',
      action: 'stopped',
    },
    {
      name: 'jared',
      age: 21,
      status: 'stopped',
      action: 'stopped',
    },
  ];

  constructor(
    _title: Title,
    _meta: Meta,
    @Inject(DOCUMENT) _document: Document,
    private _membershipService: MembershipService
  ) {
    super(_title, _meta, _document);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._membershipService.selectAllMembershipsDummy();
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
        content: `https://www.yowhood.com`,
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
        content: `https://www.yowhood.com`,
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
    { key: 'name', label: 'Name', position: 1, type: 'string' },
    { key: 'age', label: 'Age', position: 2, type: 'number' },
    { key: 'status', label: 'Status', position: 3, type: 'status' },
    { key: 'action', label: 'Action', position: 4, type: 'action' },
  ],
  STATUS: {
    status: {
      labels: { stopped: 'STOPPED' },
      cssFormats: { stopped: 'stopped' },
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
