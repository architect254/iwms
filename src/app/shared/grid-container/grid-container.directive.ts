import { Directive } from '@angular/core';
import { PageDirective } from '../page/page.directive';

@Directive({
  standalone: true,
})
export abstract class GridContainerDirective extends PageDirective {
  gridHeight: number = 0;
  gridWidth: number = 0;

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
