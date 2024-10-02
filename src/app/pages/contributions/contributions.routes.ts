import { Routes } from '@angular/router';
import { ContainerLayoutComponent } from '../../shared/layout/container-layout.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'view/:id',
        component: ViewComponent,
        data: { title: 'View Member Contribution Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        data: { title: 'Edit Member Contribution Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Member Contribution Details' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Welfare Member Contribution List' },
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
