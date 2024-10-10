import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetDialogComponent } from '../password-reset-dialog/password-reset-dialog.component';
import { AuthService } from '../../core/services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../core/services/loading.service';
import { PageDirective } from '../page/page.directive';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule,
    LogoComponent,
    MatButtonToggleModule,
    CommonModule,
  ],
})
export class LayoutComponent extends PageDirective implements OnChanges {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  breadcrumbs: breadCrumb[] = [];

  user$!: Observable<any>;
  isApiLoading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    super();

    this.configureBreadCrumbs();
  }

  isActive(route: string) {
    return this.route.firstChild?.snapshot.url.toString() == route;
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.user$ = this.authService.currentTokenUserValue$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isApiLoading$ = this.loadingService.isLoading$;
    console.log('changes', changes);
  }

  changePassword() {
    const dialog = inject(MatDialog);
    const dialogRef = dialog.open(PasswordResetDialogComponent, {
      data: { password: '', newPassword: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
      }
    });
  }

  configureBreadCrumbs() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route)
      )
      .subscribe((route) => {
        this.breadcrumbs = [];
        while (route.firstChild) {
          route = route.firstChild;

          if (route.snapshot.data['title']) {
            this.breadcrumbs.push({
              label: route.snapshot.data['title'],
              url: route?.snapshot?.url.toString(),
            });
          }
        }

        this.breadcrumbs = this.breadcrumbs.reduce(
          (previousBreadcrumbs: breadCrumb[], currentBreadcrumb) => {
            if (
              !previousBreadcrumbs.some(
                (obj) => obj.label === currentBreadcrumb.label
              )
            ) {
              previousBreadcrumbs.push(currentBreadcrumb);
            }
            return previousBreadcrumbs;
          },
          []
        );
      });
  }
  buildBreadcrumbRouteingUrl(breadcrumbPosition: number): string[] {
    let url = '';

    for (let index = 0; index <= breadcrumbPosition; index++) {
      if (this.breadcrumbs.length > 2) {
        url.concat(`/${this.breadcrumbs[index].url}`);
      } else {
        if (breadcrumbPosition == 1) {
          url = './';
        } else {
          url = this.breadcrumbs[index].url;
        }
      }
    }
    return [url];
  }

  logout() {
    this.authService.logout();
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
type breadCrumb = { label: string; url: string };
