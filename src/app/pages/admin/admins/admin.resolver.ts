import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminsService } from './admins.service';
import { Admin } from '../../../core/entities/admin.entity';
import { firstValueFrom } from 'rxjs';

export const adminResolver: ResolveFn<Admin> = (route) => {
  const id = route.paramMap.get('id');
  const adminsService = inject(AdminsService);
  return firstValueFrom(adminsService.getAdmin(id!));
};
