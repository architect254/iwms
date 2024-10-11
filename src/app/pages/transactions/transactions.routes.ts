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
        data: { title: 'View Financial Transaction Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        data: { title: 'Edit Financial Transaction Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Financial Transaction Details' },
      },
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
        data: { title: 'Welfare Financial Transactions List' },
      },
    ],
  },
];
