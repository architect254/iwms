import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
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
import { Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from '../../components/logo/logo.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PasswordResetDialogComponent } from '../password-reset-dialog/password-reset-dialog.component';
import { AuthService } from '../../../core/services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../../core/services/loading.service';
import { Admin } from '../../../core/entities/admin.entity';
import { Member } from '../../../core/entities/member.entity';

@Component({
  selector: 'iwms-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
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
export class NavigationComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user!: Observable<Admin | Member | null>;
  isApiLoading: boolean = false;

  breadcrumbs: BreadCrumb[] = [];

  dialogRef!: MatDialogRef<PasswordResetDialogComponent>;

  subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.configureBreadCrumbs();
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.subscription.add(
      this.loadingService.isLoading.subscribe((isLoading) => {
        this.isApiLoading = isLoading;
        this.cdr.detectChanges();
      })
    );
  }

  public isActive(route: string) {
    return this.router.isActive(route, {
      paths: 'subset',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  public changePassword() {
    this.dialogRef = this.dialog.open(PasswordResetDialogComponent, {
      data: { password: '', newPassword: '' },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
      }
    });
  }

  private configureBreadCrumbs() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.applyBreadcrumbRoutes(this.route);

        this.reduceBreadcrumbRoutes();
      });
  }

  private reduceBreadcrumbRoutes() {
    this.breadcrumbs = this.breadcrumbs.reduce(
      (previousBreadcrumbs: BreadCrumb[], currentBreadcrumb) => {
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
  }

  private applyBreadcrumbRoutes(route: ActivatedRoute) {
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
  }

  configureBreadcrumbRouteUrl(breadcrumbPosition: number): string[] {
    let url = '';

    url = this.configureBreadcrumbRouteUrlForEachBreadcrumb(
      breadcrumbPosition,
      url
    );
    return [url];
  }

  private configureBreadcrumbRouteUrlForEachBreadcrumb(
    breadcrumbPosition: number,
    url: string
  ) {
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
    return url;
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
interface BreadCrumb {
  label: string;
  url: string;
}
