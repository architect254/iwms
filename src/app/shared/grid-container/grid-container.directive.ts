import { Directive, inject, Inject, SkipSelf } from '@angular/core';
import { PageDirective } from '../page/page.directive';
import { AuthService } from '../../core/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Directive({
  standalone: true,
})
export abstract class GridContainerDirective extends PageDirective {
  protected pageTitle: string = '';

  gridHeight: number = 0;
  gridWidth: number = 0;

  private document = inject(DOCUMENT);

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
}
