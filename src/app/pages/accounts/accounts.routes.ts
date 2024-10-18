import { Routes } from '@angular/router';

import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { accountResolver } from './account.resolver';
import { welfaresResolver } from '../welfares/welfares.resolver';
import { ContainerLayoutComponent } from '../../shared/views/layout/container-layout.component';
import {
  Action,
  createGuard,
  updateGuard,
  viewGuard,
} from '../../core/guards/state.guard';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: ':id',
        component: UpsertComponent,
        canActivate: [updateGuard],
        resolve: {
          account: accountResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'Update Account Details', action: Action.Update },
      },
      {
        path: ':id',
        component: ViewComponent,
        canActivate: [viewGuard],
        resolve: {
          account: accountResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'View Account Details', action: Action.View },
      },
      {
        path: '',
        component: UpsertComponent,
        canActivate: [createGuard],

        resolve: { welfares: welfaresResolver },
        data: { title: 'Add Account Details', action: Action.Create },
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
