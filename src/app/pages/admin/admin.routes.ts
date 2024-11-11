import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { NavigationComponent } from '../../shared/views/navigation/navigation.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'admins',
        data: {
          title: 'IWMS Admins',
        },
        loadChildren: () =>
          import('./admins/admins.routes').then((admins) => admins.routes),
      },
      {
        path: 'welfares',
        data: {
          title: 'IWMS Welfares',
        },
        loadChildren: () =>
          import('./welfares/welfares.routes').then(
            (welfares) => welfares.routes
          ),
      },
      {
        path: 'members',
        data: {
          title: 'IWMS Welfares Members',
        },
        loadChildren: () =>
          import('./members/members.routes').then((members) => members.routes),
      },
      {
        path: 'contributions',
        data: {
          title: 'IWMS Members Contributions',
        },
        loadChildren: () =>
          import('./contributions/contributions.routes').then(
            (contributions) => contributions.routes
          ),
      },
      {
        path: 'finances',
        data: {
          title: 'IWMS Welfare Finances',
        },
        loadChildren: () =>
          import('./finance/finance.routes').then(
            (finances) => finances.routes
          ),
      },
      { path: '', redirectTo: '/admins', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
