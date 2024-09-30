import { Directive, Inject, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { PageDirective } from '../page/page.directive';
import { DOCUMENT } from '@angular/common';

@Directive({
  standalone: true,
})
export abstract class GridContainerDirective extends PageDirective {
  gridHeight: number = 0;
  gridWidth: number = 0;

  constructor(
    _title: Title,
    _meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(_title, _meta);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const toolbarHeight = this.document.getElementById('toolbar')?.offsetHeight;
    const headerHeight = this.document.getElementById('header')?.offsetHeight;
    const containerWidth =
      this.document.getElementById('container')?.offsetWidth;

    if (toolbarHeight && headerHeight && containerWidth) {
      this.gridHeight = window.innerHeight - (toolbarHeight + headerHeight);
      this.gridWidth = containerWidth;
    }
  }
}
