import { Directive, SkipSelf } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ViewPage } from './view-page.directive';
import { BehaviorSubject, Observable } from 'rxjs';

@Directive({
  standalone: true,
})
export abstract class EditableViewPage extends ViewPage {
  viewUrl!: string;
  pageAction!: 'update' | 'create';

  private _triggerValidityNotification = new BehaviorSubject(false);
  private _isSubmitting = new BehaviorSubject(false);

  isProceedAllowed: boolean | IsProceedAllowed = false;

  get isSubmitting(): Observable<boolean> {
    return this._isSubmitting.asObservable();
  }

  set isSubmitting(isIt: boolean) {
    this._isSubmitting.next(isIt);
  }

  get triggerValidityNotification(): Observable<boolean> {
    return this._triggerValidityNotification.asObservable();
  }

  set triggerValidityNotification(doTrigger: boolean) {
    this._triggerValidityNotification.next(doTrigger);
  }

  abstract onValidityNotified(
    formData: string,
    section?: string,
    childDetailsIndex?: number,
    validOffspring?: boolean
  ): void;

  abstract save(): void;
}
export type IsProceedAllowed = { [key: string]: boolean };
