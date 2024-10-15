import { Directive, inject, Inject, SkipSelf } from '@angular/core';
import { PageDirective } from '../page/page.directive';
import { AuthService } from '../../core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { FilterOption } from '../grid/model';
import { Observable } from 'rxjs';

@Directive({
  standalone: true,
})
export abstract class GridDirective extends PageDirective {
  protected pageTitle: string = '';

  gridHeight: number = 0;
  gridWidth: number = 0;

  private document = inject(DOCUMENT);

  protected page: number = 1;
  protected take: number = 100;

  protected FilterRequestDto!: any;
  protected filterRequest!: [string, string][];

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
    filterRequest: [string, string][]
  ): void;

  doApplyFilter(filters: FilterOption[]) {
    this.filterRequest = [];
    filters.forEach((filter) => {
      if (Object.hasOwn(this.FilterRequestDto, filter.key)) {
        const filterParam: { [key: string]: string | undefined } = {
          [filter.key]: filter.value,
        };
        Object.assign(this.FilterRequestDto, filterParam);
      }
    });
    Object.entries(this.FilterRequestDto)
      .filter(([key, value]) => !!value)
      .forEach(([key, value]) =>
        this.filterRequest.push([key, value as string])
      );
    this.fetchData(this.page, this.take, this.filterRequest);
  }
}
