import { Routes } from '@angular/router';

import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { accountResolver } from './account.resolver';
import { welfaresResolver } from '../welfares/welfares.resolver';
import { ContainerLayoutComponent } from '../../shared/views/navigation/container-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        resolve: { welfares: welfaresResolver },
        data: { title: 'Add User Account' },
      },
      {
        path: ':id/update',
        component: UpsertComponent,
        resolve: {
          account: accountResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'Update User Account', action: 'update' },
      },
      {
        path: ':id',
        component: ViewComponent,
        resolve: {
          account: accountResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'View User Account' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Accounts List' },
      },
    ],
  },
];
