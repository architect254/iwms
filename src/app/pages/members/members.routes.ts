import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ContainerLayoutComponent } from '../../shared/views/navigation/container-layout.component';
import { memberResolver } from './member.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Welfare Member Details', action: 'create' },
      },
      {
        path: ':id',
        component: ViewComponent,
        resolve: { member: memberResolver },
        data: { title: 'View Welfare Member Details' },
      },
      {
        path: ':id/update',
        component: UpsertComponent,
        resolve: { member: memberResolver },
        data: { title: 'Update Welfare Member Details', action: 'update' },
      },
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
        data: { title: 'Welfare Members List' },
      },
    ],
  },
];
