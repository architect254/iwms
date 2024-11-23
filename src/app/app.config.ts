import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  InjectionToken,
  APP_INITIALIZER,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  EnvironmentInjector,
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
import { adminRoutes } from './pages/admin/admin.routes';
import { clientRoutes } from './pages/clients/client.routes';
import { firstValueFrom, tap } from 'rxjs';
import { ConfigService } from './core/services/config.service';
import { BrowserPlatformLocation, DOCUMENT } from '@angular/common';
// export const API_SERVER_URL = new InjectionToken<string>(
//   'Dynamic API Server URL',
//   { providedIn: 'root', factory: () => '' }
// );
// const apiServerUrlFactory = (): string => {
//   if (false) {
//     return 'https://iwms-be-api.onrender.com';
//   } else {
//     return `http://iwms.com`;
//   }
// };
export function initializeAuth(authService: AuthService) {
  return () => authService.inilialize();
}

export function initializeConfig(
  configService: ConfigService,
  document: Document
) {
  return () => {
    const hostname = document.defaultView?.location.hostname;
    return configService.inilialize(hostname!);
  };
}

export function initializeRoutes(authService: AuthService, router: Router) {
  return () => {
    return new Promise((resolve) => {
      firstValueFrom(
        authService.isAdmin.pipe(
          tap({
            next: (isAdmin) => {
              if (isAdmin) {
                router.resetConfig([...adminRoutes, ...routes]);
              } else {
                router.resetConfig([...clientRoutes, ...routes]);
              }
            },
          })
        )
      ).finally(() => resolve(true));
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // withDebugTracing(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    // provideClientHydration(
    //   withEventReplay(),
    //   withHttpTransferCacheOptions({
    //     filter: (req: HttpRequest<unknown>) => true, // to filter
    //     includeHeaders: [], // to include headers
    //     includePostRequests: true, // to include POST
    //     includeRequestsWithAuthHeaders: false, // to include with auth
    //   })
    // ),
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
      useFactory: initializeConfig,
      deps: [ConfigService, DOCUMENT],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRoutes,
      deps: [AuthService, Router],
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    JwtHelperService,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'KES' },
    [{ provide: LOCALE_ID, useValue: 'en-KE' }],
  ],
};
