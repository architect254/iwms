import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Directive({
  standalone: true,
})
export abstract class PageDirective implements OnInit, OnDestroy {
  private _title = inject(Title);
  private _meta = inject(Meta);

  $subscription$: Subscription = new Subscription();

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.applyTitle();
    this.applyMetaTags();
  }

  applyTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        map((route) => {
          const title = route.snapshot.data['title'];
          if (title) {
            return title;
          }
          return 'My App Title';
        })
      )
      .subscribe((title) => this.setTitle(title));
  }

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

  ngOnDestroy(): void {
    if (this.$subscription$) {
      this.$subscription$.unsubscribe();
    }
  }
}
