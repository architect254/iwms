import { ResolveFn } from '@angular/router';
import { WelfaresService } from './welfares.service';
import { inject } from '@angular/core';
import { Welfare } from '../../core/models/entities';

export const welfareResolver: ResolveFn<Welfare> = (route, state) => {
  const id = route.paramMap.get('id');
  const welfaresService = inject(WelfaresService);
  return welfaresService.getWelfareById(id!);
};
