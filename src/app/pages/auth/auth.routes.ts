import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContainerLayoutComponent } from '../../shared/layout/container-layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      {
        path: `sign-in`,
        component: SignInComponent,
        data: { title: 'Welfare Management System Auth Sign In' },
      },
      {
        path: `sign-up`,
        component: SignUpComponent,
        data: { title: 'Welfare Management System Auth Sign Up' },
      },
    ],
  },
];
