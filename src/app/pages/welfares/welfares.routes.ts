import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ContainerLayoutComponent } from '../../shared/layout/container-layout.component';
import { welfareResolver } from './welfare.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'view/:id',
        component: ViewComponent,
        resolve: { welfare: welfareResolver },
        data: { title: 'View Welfare Group Details' },
      },
      {
        path: 'edit/:id',
        component: UpsertComponent,
        resolve: { welfare: welfareResolver },
        data: { title: 'Edit Welfare Group Details' },
      },
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Welfare Group Details' },
      },
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
        data: { title: 'Welfare Groups List' },
      },
    ],
  },
];
