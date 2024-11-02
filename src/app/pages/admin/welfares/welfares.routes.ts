import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { UpsertComponent } from './upsert/upsert.component';
import { ContainerLayoutComponent } from '../../../shared/views/navigation/container-layout.component';
import { welfareResolver } from './welfare.resolver';
import { membersResolver } from '../members/members.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: 'add',
        component: UpsertComponent,
        data: { title: 'Add Welfare' },
      },
      {
        path: ':id/update',
        component: UpsertComponent,
        resolve: { welfare: welfareResolver, members: membersResolver },
        data: { title: 'Update Welfare', action: 'update' },
      },
      {
        path: ':id',
        component: ViewComponent,
        resolve: { welfare: welfareResolver },
        data: { title: 'View Welfare' },
      },
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
        data: { title: 'Welfares List' },
      },
    ],
  },
];
