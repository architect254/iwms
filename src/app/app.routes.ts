import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { configResolver } from './config.resolver';

export const routes: Routes = [
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    resolve: { config: configResolver },

    data: { title: 'Not Authorized To View Page' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    resolve: { config: configResolver },

    data: { title: 'Page Not Found' },
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { config: configResolver },
  },
  { path: '**', redirectTo: 'not-found' },
];
