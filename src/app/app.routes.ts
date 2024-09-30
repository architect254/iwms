import { Routes } from '@angular/router';

import { MembershipComponent } from './pages/membership/membership.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MembershipUpsertComponent } from './pages/membership-upsert/membership-upsert.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'memberships',
        component: MembershipComponent,
        data: { title: 'Welfare Memberships' },
      },
      {
        path: 'membership-details',
        component: MembershipUpsertComponent,
        data: { title: 'Welfare Membership Details' },
      },
      { path: '', redirectTo: '/memberships', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
