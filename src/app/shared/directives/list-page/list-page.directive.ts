import { Directive, inject, SkipSelf } from '@angular/core';
import { Page } from '../page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { Filter } from '../../views/grid/model';
import { SortDirection } from '@angular/material/sort';
import { ToggleOption } from '../../components/button-toggle/button-toggle.component';

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
  protected filters: Filter[] = [];

  protected toggleOptions!: ToggleOption[];
  protected toggledOption!: ToggleOption;
  protected toggledOptionValue: string = '';

  data: any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();

    this.fetchData(this.page, this.take);

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
    page?: number,
    take?: number,
    filters?: Filter[]
  ): void;

  doApplyFilter(filters: Filter[]) {
    this.fetchData(this.page, this.take, [...this.filters, ...filters]);
  }

  doRefresh() {
    this.fetchData(this.page, this.take, this.filters);
  }
}
