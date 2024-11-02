import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: { title: 'Not Authorized To View Page' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { title: 'Page Not Found' },
  },
  { path: '**', redirectTo: 'not-found' },
];
