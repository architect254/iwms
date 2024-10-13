import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'welfares',
        data: { title: 'Welfare Groups' },
        loadChildren: () =>
          import('./pages/welfares/welfares.routes').then(
            (welfares) => welfares.routes
          ),
      },
      {
        path: 'memberships',
        data: { title: 'Welfare Memberships' },
        loadChildren: () =>
          import('./pages/memberships/memberships.routes').then(
            (memberships) => memberships.routes
          ),
      },
      {
        path: 'contributions',
        data: { title: 'Welfare Members Contributions' },
        loadChildren: () =>
          import('./pages/contributions/contributions.routes').then(
            (contributions) => contributions.routes
          ),
      },
      {
        path: 'accounts',
        data: { title: 'Welfare Financial Accounts' },
        loadChildren: () =>
          import('./pages/accounts/accounts.routes').then(
            (accounts) => accounts.routes
          ),
      },
      {
        path: 'transactions',
        data: { title: 'Welfare Financal Transactions' },
        loadChildren: () =>
          import('./pages/transactions/transactions.routes').then(
            (transactions) => transactions.routes
          ),
      },
      {
        path: 'notifications',
        data: { title: 'Welfare Message Notifications' },
        loadChildren: () =>
          import('./pages/notifications/notifications.routes').then(
            (notifications) => notifications.routes
          ),
      },
      {
        path: 'users',
        data: { title: 'Welfare Users' },
        loadChildren: () =>
          import('./pages/users/users.routes').then((users) => users.routes),
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { title: 'Page Not Found' },
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];
