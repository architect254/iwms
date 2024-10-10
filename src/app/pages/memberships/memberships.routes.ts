import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ContainerLayoutComponent } from '../../shared/layout/container-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'view/:id',
        component: ViewComponent,
        data: { title: 'View Welfare Membership Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        data: { title: 'Edit Welfare Membership Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Welfare Membership Details' },
      },
      {
        path: '',
        component: ListComponent,
        pathMatch: 'full',
        data: { title: 'Welfare Memberships List' },
      },
    ],
  },
];
