import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { User } from './user.model';
import {
  CustomDropdownControl,
  CustomTextboxControl,
  DynamicCustomFormControlBase,
} from '../../shared/form-control/form.service';
import {
  CustomListData,
  CustomTextData,
  DynamicCustomDataBase,
} from '../../shared/view-data/view.service';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  protected override endpoint = `${this.API_URL}/users`;

  getUserDetailsFormControls() {
    const controls: DynamicCustomFormControlBase<string>[] = [
      new CustomTextboxControl({
        key: 'first_name',
        label: 'First Name',
        value: '',
        placeholder: 'John',
        icon: 'badge',
        required: true,
        order: 1,
      }),
      new CustomTextboxControl({
        key: 'last_name',
        label: 'Last Name',
        value: '',
        placeholder: 'Doe',
        icon: 'badge',
        required: true,
        order: 2,
      }),
      new CustomTextboxControl({
        key: 'id_number',
        label: 'National ID No.',
        value: '',
        placeholder: '12345678',
        icon: 'fingerprint',
        required: true,
        order: 3,
      }),
      new CustomTextboxControl({
        key: 'email',
        label: 'Email',
        value: '',
        placeholder: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 4,
      }),
      new CustomTextboxControl({
        key: 'phone_number',
        label: 'Phone No.',
        value: '',
        placeholder: '0712345678',
        icon: 'call_log',
        required: true,
        order: 5,
      }),
      new CustomDropdownControl({
        key: 'role',
        label: 'User Role',
        options: [
          { key: 'site admin', value: 'Site Admin' },
          { key: 'client', value: 'Client' },
        ],
        icon: 'checklist',
        order: 3,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getViewData() {
    const data: DynamicCustomDataBase<string>[] = [
      new CustomTextData({
        key: 'first_name',
        label: 'First name',
        value: 'John',
        icon: 'badge',
        order: 1,
      }),
      new CustomTextData({
        key: 'last_name',
        label: 'Last Name',
        value: 'Doe',
        icon: 'badge',
        order: 2,
      }),
      new CustomTextData({
        key: 'id_number',
        label: 'National ID No.',
        value: '12345678',
        icon: 'fingerprint',
        order: 3,
      }),
      new CustomTextData({
        key: 'phone_number',
        label: 'Phone No.',
        value: '0712345678',
        icon: 'call_log',
        order: 4,
      }),
      new CustomTextData({
        key: 'email',
        label: 'Email',
        value: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 5,
      }),
      new CustomListData({
        key: 'role',
        label: 'User Role',
        options: [
          { label: 'Site Admin', value: 'site admin' },
          { label: 'Client', value: 'Client' },
        ],
        icon: 'checklist',
        order: 3,
      }),
    ];
    return of(data.sort((a, b) => a.order - b.order));
  }

  createUser(payload: any) {
    return this.http
      .post(this.endpoint, payload)
      .pipe(catchError(this.errorHandler));
  }
  getUsers(page: number = 1, take: number = 10): Observable<User[]> {
    return this.http
      .get<User[]>(this.endpoint, {
        params: new HttpParams().set('page', page).set('take', take),
      })
      .pipe(catchError(this.errorHandler));
  }

  getUserById(id: number | string) {
    this.http
      .get<User>(this.endpoint, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
}
