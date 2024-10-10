import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { userResolver } from './user.resolver';
import { welfaresResolver } from '../welfares/welfares.resolver';
import { ContainerLayoutComponent } from '../../shared/layout/container-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'view/:id',
        component: ViewComponent,
        resolve: {
          user: userResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'View User Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        resolve: {
          user: userResolver,
          welfares: welfaresResolver,
        },
        data: { title: 'Edit User Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add User Details' },
      },
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
        data: { title: 'Welfare Users List' },
      },
    ],
  },
];
