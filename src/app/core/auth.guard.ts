import { Injectable } from '@angular/core';
import {
  CanLoad,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Route,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<UrlTree> {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<UrlTree> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean | Observable<UrlTree> {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | Observable<UrlTree> {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Navigate to the login page with extras
    return of(this.router.createUrlTree([['/sign-in']]));
  }
}
