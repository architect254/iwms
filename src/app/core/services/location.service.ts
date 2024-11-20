import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private authService: AuthService) {}

  private _routes = [
    {
      name: 'Members',
      route: 'members',
      icon: 'contacts',
      position: 2,
    },
    {
      name: 'Contributions',
      route: 'contributions',
      icon: 'currency_exchange',
      position: 3,
    },
    {
      name: 'Finances',
      route: 'finances',
      icon: 'account_balance',
      position: 4,
    },
  ];
  private _adminRoutes = [
    {
      name: 'Admins',
      route: 'admins',
      icon: 'group',
      position: 0,
    },
    {
      name: 'Welfares',
      route: 'welfares',
      icon: 'accessibility_new',
      position: 1,
    },
  ];

  get routes(): Observable<any[]> {
    return this.authService.isAdmin.pipe(
      map((isAdmin) => {
        let routes: any[];

        if (isAdmin) {
          routes = [...this._routes, ...this._adminRoutes];
        } else {
          routes = [
            {
              name: 'Home',
              route: '/',
              icon: 'home',
              position: 0,
            },
            ...this._routes,
          ];
        }
        return routes.sort((p, n) => p.position - n.position);
      })
    );
  }
}
