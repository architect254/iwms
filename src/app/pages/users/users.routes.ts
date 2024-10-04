import { Routes } from '@angular/router';
import { ContainerLayoutComponent } from './container-layout.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'view/:id',
        component: ViewComponent,
        data: { title: 'View User Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        data: { title: 'Edit User Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add User Details' },
      },
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
        data: { title: 'Welfare Users List' },
      },
      { path: '**', redirectTo: '/not-found' },
    ],
  },
];
