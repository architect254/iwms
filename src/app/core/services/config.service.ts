import { Injectable } from '@angular/core';
import { first, firstValueFrom, ReplaySubject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { STORAGE_KEYS } from './local-storage.service';
import { Config } from '../entities/config.entity';

@Injectable({ providedIn: 'root' })
export class ConfigService extends ApiService {
  protected override endpoint = `${this.API_URL}/config`;

  _config = new ReplaySubject<Config>(1);

  inilialize(hostname: string) {
    return new Promise<void>((resolve) => {
      firstValueFrom(this.getConfig(hostname))
        .then((config) => {
          this._config.next(config || null);
          resolve();
        })
        .catch(() => {
          resolve();
        });
    });
  }

  getConfig(hostname: string) {
    return this.http.get<any>(`${this.endpoint}/${hostname}`).pipe(first());
  }

  get config() {
    return this._config.asObservable();
  }
}
