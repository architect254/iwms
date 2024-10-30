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
        path: 'users',
        data: {
          title: 'IWMS Users',
        },
        loadChildren: () =>
          import('./users/users.routes').then((users) => users.routes),
      },
      {
        path: 'welfare-groups',
        data: {
          title: 'Welfare Groups',
        },
        loadChildren: () =>
          import('./welfares/welfares.routes').then(
            (welfares) => welfares.routes
          ),
      },
      { path: '', redirectTo: '/users', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
