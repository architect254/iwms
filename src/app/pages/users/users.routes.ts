import { Routes } from '@angular/router';

import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { welfaresResolver } from '../welfares/welfares.resolver';
import { ContainerLayoutComponent } from '../../shared/views/navigation/container-layout.component';
import { userResolver } from './user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        resolve: { welfares: welfaresResolver },
        data: { title: 'Add User' },
      },
      {
        path: ':id/update',
        component: UpsertComponent,
        resolve: {
          user: userResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'Update User', action: 'update' },
      },
      {
        path: ':id',
        component: ViewComponent,
        resolve: {
          user: userResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'View User' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Users List' },
      },
    ],
  },
];
