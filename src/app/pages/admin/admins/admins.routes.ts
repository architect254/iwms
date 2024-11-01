import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { welfaresResolver } from '../welfares/welfares.resolver';
import { adminResolver } from './admin.resolver';
import { ContainerLayoutComponent } from '../../../shared/views/navigation/container-layout.component';
import { UpsertComponent } from './upsert/upsert.component';
import { upsertAdminGuard } from '../../../core/guards/upsert-admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        canMatch: [upsertAdminGuard],
        data: { title: 'Add Admin' },
      },
      // {
      //   path: ':id/update',
      //   component: UpsertComponent,
      //   resolve: {
      //     admin: adminResolver,
      //     welfares: welfaresResolver,
      //   },
      //   data: { title: 'Update Admin', action: 'update' },
      // },
      // {
      //   path: ':id',
      //   component: ViewComponent,
      //   resolve: {
      //     admin: adminResolver,
      //     welfares: welfaresResolver,
      //   },
      //   data: { title: 'View Admin' },
      // },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Admins List' },
      },
    ],
  },
];
