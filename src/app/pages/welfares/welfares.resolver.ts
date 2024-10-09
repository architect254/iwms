import { ResolveFn } from '@angular/router';
import { WelfaresService } from './welfares.service';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { Welfare } from './welfare';

export const welfaresResolver: ResolveFn<Welfare[] | null> = (route, state) => {
  const welfaresService = inject(WelfaresService);
  return welfaresService
    .getAllWelfares()
    .pipe(catchError(welfaresService.errorHandler));
};
