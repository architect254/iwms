import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { userResolver, welfareResolver } from './user.resolver';
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
          welfare: welfareResolver,
        },
        data: { title: 'View User Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        resolve: {
          user: userResolver,
          welfares: welfaresResolver,
          welfare: welfareResolver,
        },
        data: { title: 'Edit User Details', action: 'update' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        resolve: { welfares: welfaresResolver },
        data: { title: 'Add User Details', action: 'create' },
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
