import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Directive,
  inject,
  OnDestroy,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Directive({
  standalone: true,
})
export abstract class Page implements OnInit, OnDestroy {
  private _title: Title = inject(Title);
  private _meta: Meta = inject(Meta);

  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);

  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected dialog: MatDialog = inject(MatDialog);
  protected dialogRef!: MatDialogRef<any>;

  protected subscriptions: Subscription = new Subscription();

  pageTitle!: string;

  constructor(@SkipSelf() protected authService: AuthService) {
    this.applyTitle();
    this.applyMetaTags();
  }

  ngOnInit(): void {}

  applyTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.route;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        map((route) => {
          const title = route.snapshot.data['title'];
          if (title) {
            this.pageTitle = title;
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
    this.subscriptions.unsubscribe();
  }
}
