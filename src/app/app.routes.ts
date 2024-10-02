import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    data: { title: 'Welfare Management System Auth Portal' },
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((auth) => auth.routes),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        data: { title: 'Welfare Users' },
        loadChildren: () =>
          import('./pages/users/users.routes').then((users) => users.routes),
      },
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
        data: { title: 'Welfare Member Contributions' },
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
        data: { title: 'Welfare Message Notification' },
        loadChildren: () =>
          import('./pages/notifications/notifications.routes').then(
            (notifications) => notifications.routes
          ),
      },
      { path: '', redirectTo: '/memberships', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
