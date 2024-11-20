import { Routes } from '@angular/router';

import { UpsertComponent } from './upsert/upsert.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { ContainerLayoutComponent } from '../../../shared/views/navigation/container-layout.component';
import { contributionResolver } from './contribution.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Contribution' },
      },
      {
        path: ':id/update',
        component: UpsertComponent,
        resolve: {
          contribution: contributionResolver,
        },
        data: { title: 'Update Contribution', action: 'update' },
      },
      {
        path: ':id',
        component: ViewComponent,
        resolve: {
          contribution: contributionResolver,
        },
        data: { title: 'View Contribution' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Contributions List' },
      },
    ],
  },
];
