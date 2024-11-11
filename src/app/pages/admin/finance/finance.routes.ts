import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { ContainerLayoutComponent } from '../../../shared/views/navigation/container-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: ':id',
        component: ViewComponent,
        resolve: {},
        data: { title: 'View Finance' },
      },
      {
        path: '',
        component: ListComponent,
        data: { title: 'Welfare Finances' },
      },
    ],
  },
];
