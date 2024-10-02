import { Routes } from '@angular/router';
import { ContainerLayoutComponent } from './container-layout.component';
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
        data: { title: 'View Message Notification Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        data: { title: 'Edit Message Notification Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Message Notification Details' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Welfare Message Notifications List' },
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
