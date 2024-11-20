import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { NavigationComponent } from '../../shared/views/navigation/navigation.component';
import { configResolver } from '../../config.resolver';
import { HomeViewComponent } from './view/view.component';
import { welfareResolver } from './view/welfare.resolver';

export const clientRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    resolve: { config: configResolver },
    canMatch: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'members',
        data: {
          title: 'Welfare Members',
        },
        loadChildren: () =>
          import('./members/members.routes').then((members) => members.routes),
      },
      {
        path: 'contributions',
        data: {
          title: 'Members Contributions',
        },
        loadChildren: () =>
          import('./contributions/contributions.routes').then(
            (contributions) => contributions.routes
          ),
      },
      {
        path: 'finances',
        data: {
          title: 'Welfare Finances',
        },
        loadChildren: () =>
          import('./finance/finance.routes').then(
            (finances) => finances.routes
          ),
      },
      {
        path: '',
        data: {
          title: 'Welfare Details',
        },
        resolve: { welfare: welfareResolver },
        component: HomeViewComponent,
      },
      // { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];
