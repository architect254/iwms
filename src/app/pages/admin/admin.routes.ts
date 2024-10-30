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
        path: 'welfare-groups',
        data: {
          title: 'Welfare Groups',
        },
        loadChildren: () =>
          import('./welfares/welfares.routes').then(
            (welfares) => welfares.routes
          ),
      },
      {
        path: 'members',
        data: {
          title: 'IWMS Members',
        },
        loadChildren: () =>
          import('./members/members.routes').then((members) => members.routes),
      },
      { path: '', redirectTo: '/admins', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
