import { Routes } from '@angular/router';

import { NavigationComponent } from './shared/views/navigation/navigation.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard, noAuthGuard, roleGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { Membership } from './pages/users/entities/user.entity';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canMatch: [authGuard],
    children: [
      {
        path: 'user',
        data: {
          title: 'IWMS Users',
          role: {
            membership: Membership.Admin,
            redirectUrl: 'welfare-members',
          },
        },
        canMatch: [roleGuard],
        loadChildren: () =>
          import('./pages/users/users.routes').then((users) => users.routes),
      },
      {
        path: 'welfare-groups',
        data: {
          title: 'Welfare Groups',
          role: { mmbership: Membership.Admin, redirectUrl: 'members' },
        },
        canMatch: [roleGuard],
        loadChildren: () =>
          import('./pages/welfares/welfares.routes').then(
            (welfares) => welfares.routes
          ),
      },
      { path: '', redirectTo: '/welfare-members', pathMatch: 'full' },

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
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: { title: 'Not Authorized To View Page' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { title: 'Page Not Found' },
  },
  { path: '**', redirectTo: 'not-found' },
];
