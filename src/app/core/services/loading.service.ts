import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = new BehaviorSubject(false);

  constructor() {}

  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  set isLoading(isItLoading: boolean) {
    this._isLoading.next(isItLoading);
  }
}
