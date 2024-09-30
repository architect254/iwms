import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lh-grid',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() set data(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
  }

  @Input() columnProperties: ColumnProperties[] = [];
  @Input() statusProperties: StatusProperties = {};
  @Input() actionProperties: ActionProperties = {};

  @Input() defaultSortColumn: string = '';
  @Input() defaultSortColumnDirection: 'asc' | 'desc' = 'asc';

  dataSource!: MatTableDataSource<any[]>;
  resultsLength = 0;
  isLoadingResults = true;
  isLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get displayedColumns() {
    return this.columnProperties.map(
      (columnProperties) => columnProperties.key
    );
  }

  // ngAfterViewInit() {
  //   this.exampleDatabase = new HospitalHttpDatabase(this._httpClient);

  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;

  //         return this.exampleDatabase!.getQueueItems(
  //           this.sort.active,
  //           this.sort.direction,
  //           this.paginator.pageIndex
  //         ).pipe(catchError(() => observableOf(null)));
  //       }),
  //       map((data) => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = data === null;

  //         if (data === null) {
  //           return [];
  //         }

  //         // Only refresh the result length if there is new data. In case of rate
  //         // limit errors, we do not want to reset the paginator to zero, as that
  //         // would prevent users from re-triggering requests.
  //         this.resultsLength = data.length;
  //         return data;
  //       })
  //     )
  //     .subscribe((data) => {
  //       this.data = data;
  //       this.databkup = data;
  //     });
  // }
}
export type DataType = 'string' | 'number' | 'status' | 'action';

export interface ColumnProperties {
  key: string;
  label: string;
  type: DataType;
  position: number;
}
export interface StatusProperties {
  [columnKey: string]: {
    labels: { [value: string]: string };
    cssFormats: { [value: string]: string };
  };
}
export interface ActionProperties {
  [columnKey: string]: { actions: ActionDefinition[] };
}
export interface ActionDefinition {
  name: string;
  implementation: (...dependencies: any) => any;
}
