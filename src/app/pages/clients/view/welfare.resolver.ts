import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Welfare } from '../../../core/entities/welfare.entity';
import { firstValueFrom, switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { WelfaresService } from '../welfares/welfares.service';

export const welfareResolver: ResolveFn<Welfare> = (route, state) => {
  const authService = inject(AuthService);
  const welfareService = inject(WelfaresService);
  return firstValueFrom(
    authService.welfare.pipe(
      switchMap((welfare) => {
        return welfareService.getWelfareById(welfare.id!);
      })
    )
  );
};
