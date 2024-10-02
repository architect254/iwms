import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Directive({
  standalone: true,
})
export abstract class PageDirective implements OnInit, OnDestroy {
  private _title = inject(Title);
  private _meta = inject(Meta);

  $subscription$: Subscription = new Subscription();

  setTitle(_title: string) {
    this._title.setTitle(_title);
  }

  setMeta(_meta: MetaDefinition[]) {
    this._meta.addTags(_meta);
  }

  applyMetaTags() {
    this.setDefaultMetaAndTitle();
    this.setTwitterCardMeta();
    this.setFacebookOpenGraphMeta();
  }

  abstract setDefaultMetaAndTitle(): void;
  abstract setTwitterCardMeta(): void;
  abstract setFacebookOpenGraphMeta(): void;

  ngOnInit(): void {
    this.applyMetaTags();
  }

  ngOnDestroy(): void {
    if (this.$subscription$) {
      this.$subscription$.unsubscribe();
    }
  }
}
