import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/views/layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard, noAuthGuard, roleGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AccountType } from './pages/accounts/model';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canMatch: [authGuard],
    children: [
      {
        path: 'accounts',
        data: {
          title: 'Welfare User Accounts',
          role: { type: AccountType.Admin, redirectUrl: 'members' },
        },
        canMatch: [roleGuard],
        loadChildren: () =>
          import('./pages/accounts/accounts.routes').then(
            (accounts) => accounts.routes
          ),
      },
      {
        path: 'welfare-groups',
        data: { title: 'Welfare Groups' },
        loadChildren: () =>
          import('./pages/welfares/welfares.routes').then(
            (welfares) => welfares.routes
          ),
      },
      {
        path: 'members',
        data: { title: 'Welfare Members' },
        loadChildren: () =>
          import('./pages/members/members.routes').then(
            (members) => members.routes
          ),
      },
      { path: '', redirectTo: '/accounts', pathMatch: 'full' },

      // {
      //   path: 'contributions',
      //   data: { title: 'Welfare Members Contributions' },
      //   loadChildren: () =>
      //     import('./pages/contributions/contributions.routes').then(
      //       (contributions) => contributions.routes
      //     ),
      // },
      // {
      //   path: 'accounts',
      //   data: { title: 'Welfare Financial Accounts' },
      //   loadChildren: () =>
      //     import('./pages/accounts/accounts.routes').then(
      //       (accounts) => accounts.routes
      //     ),
      // },
      // {
      //   path: 'transactions',
      //   data: { title: 'Welfare Financal Transactions' },
      //   loadChildren: () =>
      //     import('./pages/transactions/transactions.routes').then(
      //       (transactions) => transactions.routes
      //     ),
      // },
      // {
      //   path: 'notifications',
      //   data: { title: 'Welfare Message Notifications' },
      //   loadChildren: () =>
      //     import('./pages/notifications/notifications.routes').then(
      //       (notifications) => notifications.routes
      //     ),
      // },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { title: 'Page Not Found' },
  },
  { path: '**', redirectTo: 'not-found' },
];
