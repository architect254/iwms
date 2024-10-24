import { Directive, inject, SkipSelf } from '@angular/core';
import { Page } from '../page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { Filter } from '../../views/grid/model';
import { SortDirection } from '@angular/material/sort';

@Directive({
  standalone: true,
})
export abstract class ListPage extends Page {
  gridHeight: number = 0;
  gridWidth: number = 0;

  private document = inject(DOCUMENT);
  protected defaultSortColumn!: string;
  protected defaultSortColumnDirection!: SortDirection;

  protected page: number = 1;
  protected take: number = 100;

  protected type: string = 'all';

  data: any[] = [];

  constructor(@SkipSelf() authService: AuthService) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.fetchData(this.page, this.take, this.type);

    const toolbarHeight = this.document.getElementById('toolbar')?.offsetHeight;
    const headerHeight = this.document.getElementById('header')?.offsetHeight;
    const containerWidth = this.document.getElementById(
      'main-routing-container'
    )?.offsetWidth;

    if (toolbarHeight && headerHeight && containerWidth) {
      this.gridHeight = window.innerHeight - (toolbarHeight + headerHeight);
      this.gridWidth = containerWidth;
    }
  }

  protected abstract fetchData(
    page: number,
    take: number,
    type: string,
    filters?: Filter[]
  ): void;

  doApplyFilter(filters: Filter[]) {
    this.fetchData(this.page, this.take, this.type, filters);
  }

  doRefresh() {
    this.fetchData(this.page, this.take, this.type);
  }
}
