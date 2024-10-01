import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'memberships',
        loadChildren: () =>
          import('./pages/memberships/memberships.routes').then(
            (memberships) => memberships.routes
          ),
      },
      { path: '', redirectTo: '/memberships', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
