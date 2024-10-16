import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { accountResolver } from './account.resolver';
import { welfaresResolver } from '../welfares/welfares.resolver';
import { ContainerLayoutComponent } from '../../shared/views/layout/container-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        resolve: { welfares: welfaresResolver },
        data: { title: 'Add Account Details', action: 'create' },
      },
      {
        path: ':id/update',
        component: UpsertComponent,
        resolve: {
          account: accountResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'Update Account Details', action: 'update' },
      },
      {
        path: ':id',
        component: ViewComponent,
        pathMatch: 'full',
        resolve: {
          account: accountResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'View Account Details' },
      },
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
        data: { title: 'Accounts List' },
      },
    ],
  },
];
