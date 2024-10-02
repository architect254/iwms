import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  $isLoading = new BehaviorSubject(false);

  constructor() {}

  get isLoading$() {
    return this.$isLoading.asObservable();
  }

  set isLoading(isItLoading: boolean) {
    this.$isLoading.next(isItLoading);
  }
}
