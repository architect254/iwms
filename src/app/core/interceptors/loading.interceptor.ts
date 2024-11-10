import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let service_count = 0;
  const loadingService = inject(LoadingService);

  const isSearch = req.url.split('/').pop()?.includes('search');

  if (!isSearch) {
    service_count++;
    loadingService.isLoading = true;
  } else {
    loadingService.isLoading = false;
  }
  return next(req).pipe(
    finalize(() => {
      if (!isSearch) {
        service_count--;

        if (service_count === 0) {
          loadingService.isLoading = false;
        }
      }
    })
  );
};
