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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  snackbar = inject(MatSnackBar);

  protected authService = inject(AuthService);

  protected subscriptions: Subscription = new Subscription();

  pageTitle!: string;

  constructor() {
    this.getTitle();
    this.applyMetaTags();
  }

  ngOnInit(): void {}

  getTitle() {
    this.subscriptions.add(
      this.route.data.subscribe({
        next: (data) => {
          this.pageTitle = data['title'];
          this.setTitle(this.pageTitle);
        },
      })
    );
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
