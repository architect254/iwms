import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { ContainerLayoutComponent } from '../../shared/layout/container-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'view/:id',
        component: ViewComponent,
        data: { title: 'View Financial Account Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        data: { title: 'Edit Financial Account Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Financial Account Details' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Welfare Financial Accounts List' },
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
