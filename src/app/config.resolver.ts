import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ConfigService } from './core/services/config.service';
import { firstValueFrom } from 'rxjs';
import { Config } from './core/entities/config.entity';

export const configResolver: ResolveFn<Config> = (route, state) => {
  const configService = inject(ConfigService);
  return firstValueFrom(configService.config);
};
