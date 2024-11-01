import { Routes } from '@angular/router';

import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { welfaresResolver } from '../welfares/welfares.resolver';
import { memberResolver } from './member.resolver';
import { ContainerLayoutComponent } from '../../../shared/views/navigation/container-layout.component';
import { membersResolver } from './members.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        resolve: { welfares: welfaresResolver },
        data: { title: 'Add Welfare Member' },
      },
      {
        path: ':id/update',
        component: UpsertComponent,
        resolve: {
          member: memberResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'Update Welfare Member', action: 'update' },
      },
      {
        path: ':id',
        component: ViewComponent,
        resolve: {
          member: memberResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'View Welfare Member' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Welfare Members List' },
      },
    ],
  },
];
