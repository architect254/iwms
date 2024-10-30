import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  InjectionToken,
  APP_INITIALIZER,
} from '@angular/core';
import {
  provideRouter,
  Router,
  withDebugTracing,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import {
  HTTP_INTERCEPTORS,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  JwtHelperService,
  JWT_OPTIONS,
  JwtInterceptor,
} from '@auth0/angular-jwt';
import { AuthService } from './core/services/auth.service';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import {
  API_SERVER_URL,
  apiServerUrlFactory,
} from './core/services/api.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { adminRoutes } from './pages/admin/admin.routes';
import { clientRoutes } from './pages/client/client.routes';

export function initializeAuth(authService: AuthService) {
  return () => authService.inilialize();
}

export function initializeRoutes(authService: AuthService, router: Router) {
  return () => {
    new Promise<void>((resolve) => {
      if (authService.isAdmin) {
        router.resetConfig([...adminRoutes, ...routes]);
      } else {
        router.resetConfig([...clientRoutes, ...routes]);
      }
      resolve();
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      adminRoutes,
      // withDebugTracing(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        filter: (req: HttpRequest<unknown>) => true, // to filter
        includeHeaders: [], // to include headers
        includePostRequests: true, // to include POST
        includeRequestsWithAuthHeaders: false, // to include with auth
      })
    ),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, errorInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService, LocalStorageService],
      multi: true,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeRoutes,
    //   deps: [AuthService, LocalStorageService, Router],
    //   multi: true,
    // },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: API_SERVER_URL, useFactory: apiServerUrlFactory, multi: true },
    AuthService,
    JwtHelperService,
  ],
};
