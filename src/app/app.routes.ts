import { Routes } from '@angular/router';

import { NavigationComponent } from './shared/views/navigation/navigation.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { Membership } from './pages/users/entities/user.entity';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        data: {
          title: 'IWMS Users',
        },
        loadChildren: () =>
          import('./pages/users/users.routes').then((users) => users.routes),
      },
      {
        path: 'welfare-groups',
        data: {
          title: 'Welfare Groups',
        },
        loadChildren: () =>
          import('./pages/welfares/welfares.routes').then(
            (welfares) => welfares.routes
          ),
      },
      { path: '', redirectTo: '/users', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
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
