import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const whiteListedUrls = [`sign-up`, `sign-in`];

  const authService: AuthService = inject(AuthService);

  return authService.currentToken$.pipe(
    switchMap((token) => {
      const isApiUrl = req.url.startsWith(environment.serverUrl);

      if (token && isApiUrl && !whiteListedUrls.includes(req.url)) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return next(req);
    })
  );
};
