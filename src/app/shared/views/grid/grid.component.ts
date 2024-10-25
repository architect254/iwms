import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  Action,
  GridColumn,
  StatusColors,
  StatusLabels,
} from './model';

@Component({
  selector: 'iwms-grid',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ScrollingModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> {
  @Input() name: string = '';
  @Input() set data(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
  }

  @Input() disableAddition: boolean = false;

  @Input() columns!: GridColumn[];
  @Input() labels?: StatusLabels;
  @Input() colors?: StatusColors;
  @Input() actions?: Action<T>[];

  @Input() defaultSortColumn: string = '';
  @Input() defaultSortColumnDirection: SortDirection = 'asc';

  @Output() refresh = new EventEmitter<never>();

  dataSource!: MatTableDataSource<any[]>;
  resultsLength = 0;
  isLoadingResults = true;
  isLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  viewUrl: string = '';

  get displayedColumns() {
    return this.columns.map((column) => column.key);
  }

  // ngAfterViewInit() {
  //   this.exampleDatabase = new HospitalHttpDatabase(this._httpClient);

  //   // If the account changes the sort order, reset back to the first page.
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

  doRefresh() {
    this.refresh.emit();
  }
}
