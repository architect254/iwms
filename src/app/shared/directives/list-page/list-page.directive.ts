import { Directive, inject, SkipSelf } from '@angular/core';
import { Page } from '../page/page.directive';
import { AuthService } from '../../../core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { Filter, FilterOption } from '../../views/grid/model';

@Directive({
  standalone: true,
})
export abstract class ListPage extends Page {
  gridHeight: number = 0;
  gridWidth: number = 0;

  private document = inject(DOCUMENT);

  protected page: number = 1;
  protected take: number = 100;

  constructor(@SkipSelf() authService: AuthService) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

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
    filters: Filter[]
  ): void;

  doApplyFilter(filters: Filter[]) {
    this.fetchData(this.page, this.take, filters);
  }
}
