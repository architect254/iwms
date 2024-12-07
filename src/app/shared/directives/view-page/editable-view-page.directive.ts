import { Directive } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ViewPage } from './view-page.directive';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Directive({
  standalone: true,
})
export abstract class EditableViewPage extends ViewPage {
  viewUrl: string = '../';
  override listUrl: string = '../../';
  pageAction!: PageAction;

  private _triggerValidityNotification = new BehaviorSubject(false);
  private _isSubmitting = new BehaviorSubject(false);

  isProceedAllowed:
    | boolean
    | Record<string, boolean>
    | Record<string, boolean | Record<string, boolean | boolean[]>> = false;

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

  constructor() {
    super();
    this.subscriptions.add(
      this.route.data.subscribe({
        next: (data) => {
          this.pageAction = data['action'];
        },
      })
    );
  }

  abstract onValidityNotified(
    formData: string,
    section?: string,
    childDetailsIndex?: number,
    validOffspring?: boolean
  ): void;

  abstract save(): void;
}
export type PageAction = 'update' | 'add';
