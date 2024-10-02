import { Component, Inject, OnInit, inject } from '@angular/core';
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
    MatSelectModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule,
    LogoComponent,
    MatButtonToggleModule,
    CommonModule,
  ],
})
export class LayoutComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  breadcrumbs: breadCrumb[] = [];
  route: ActivatedRoute | null | undefined;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.configureBreadCrumbs();
  }
  ngOnInit(): void {}
  configureBreadCrumbs() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
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
}
type breadCrumb = { label: string; url: string };
