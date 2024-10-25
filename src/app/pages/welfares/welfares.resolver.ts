import { ResolveFn } from '@angular/router';
import { WelfaresService } from './welfares.service';
import { inject } from '@angular/core';

import { Welfare } from './entities/welfare.entity';

export const welfaresResolver: ResolveFn<Welfare[] | null> = (route, state) => {
  const welfaresService = inject(WelfaresService);
  return welfaresService.getWelfares();
};
