import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { User } from './user.model';
import {
  CustomDateControl,
  CustomDropdownControl,
  CustomTextboxControl,
  DynamicCustomFormControlBase,
} from '../../shared/form-control/form.service';
import {
  CustomDateData,
  CustomListData,
  CustomStatusData,
  CustomTextData,
  DynamicCustomDataBase,
} from '../../shared/data-view/view.service';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  protected override endpoint = `${this.API_URL}/users`;

  getCoreUserDetailsFormControls() {
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
      new CustomDateControl({
        key: 'birth_date',
        label: 'Birth Date',
        value: '',
        placeholder: '11/07/2000',
        dateConfig: {
          startDate: new Date(2000, 0, 1),
          minDate: new Date(1930, 0, 1),
          maxDate: new Date(Date.now()),
        },
        icon: 'cake',
        required: true,
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
      new CustomTextboxControl({
        key: 'email',
        label: 'Email',
        value: '',
        placeholder: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        required: true,
        order: 6,
      }),
      new CustomDropdownControl({
        key: 'role',
        label: 'User Role',
        options: [
          { key: 'Site Admin', value: 'Site Admin' },
          { key: 'Welfare Manager', value: 'Welfare Manager' },
          { key: 'Welfare Accountant', value: 'Welfare Accountant' },
          { key: 'Welfare Secretary', value: 'Welfare Secretary' },
          { key: 'Welfare Client Member', value: 'Welfare Client Member' },
        ],
        icon: 'checklist',
        required: true,
        order: 7,
      }),
      new CustomDropdownControl({
        key: 'group_id',
        label: 'Group Name',
        options: [
          { key: 'Mzedu', value: 'Mzedu' },
          { key: 'Wumweri', value: 'Wumweri' },
          { key: 'Mzinyi', value: 'Mzinyi' },
          { key: 'Mbololo Sacco', value: 'Mbololo Sacco' },
          {
            key: 'Wundanyi Pedu Self-help',
            value: 'Wundanyi Pedu Self-help',
          },
        ],
        icon: 'groups',
        required: false,
        visible: false,
        order: 8,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getMembershipDetailsFormControls() {
    const controls: DynamicCustomFormControlBase<string>[] = [];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getUserDataView(): Observable<
    DynamicCustomDataBase<string | number | Date>[]
  > {
    const data: DynamicCustomDataBase<string | number | Date>[] = [
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
      new CustomDateData({
        key: 'birth_date',
        label: 'Date of Birth',
        value: '07/06/1999',
        icon: 'cake',
        order: 4,
      }),
      new CustomTextData({
        key: 'phone_number',
        label: 'Phone No.',
        value: '0712345678',
        icon: 'call_log',
        order: 5,
      }),
      new CustomTextData({
        key: 'email',
        label: 'Email',
        value: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 6,
      }),
      new CustomStatusData({
        key: 'role',
        label: 'User Role',
        value: 'Welfare Client Member',
        colors: {
          'Site Admin': 'red',
          'Welfare Manager': 'orange',
          'Welfare Accountant': 'blue',
          'Welfare Secretary': 'purple',
          'Welfare Client Member': 'green',
        },
        icon: 'checklist',
        order: 7,
      }),
    ];
    return of(data.sort((a, b) => a.order - b.order));
  }

  getSpouseDataView(): Observable<
    DynamicCustomDataBase<string | number | Date>[]
  > {
    const data: DynamicCustomDataBase<string | number | Date>[] = [
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
      new CustomDateData({
        key: 'birth_date',
        label: 'Date of Birth',
        value: '07/06/1999',
        icon: 'cake',
        order: 4,
      }),
      new CustomTextData({
        key: 'phone_number',
        label: 'Phone No.',
        value: '0712345678',
        icon: 'call_log',
        order: 5,
      }),
      new CustomTextData({
        key: 'email',
        label: 'Email',
        value: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 6,
      }),
      new CustomStatusData({
        key: 'role',
        label: 'User Role',
        value: 'Welfare Client Member',
        colors: {
          'Site Admin': 'red',
          'Welfare Manager': 'orange',
          'Welfare Accountant': 'blue',
          'Welfare Secretary': 'purple',
          'Welfare Client Member': 'green',
        },
        icon: 'checklist',
        order: 7,
      }),
    ];
    return of(data.sort((a, b) => a.order - b.order));
  }

  getChildDataView(): Observable<DynamicCustomDataBase<string>[]> {
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
        label: 'Last Name1',
        value: 'Doe',
        icon: 'badge',
        order: 2,
      }),
      new CustomDateData({
        key: 'birth_date',
        label: 'Date of Birth2',
        value: '07/06/1999',
        icon: 'cake',
        order: 3,
      }),
    ];
    return of(data.sort((a, b) => a.order - b.order));
  }

  createUser(payload: any): Observable<User> {
    return this.http
      .post(this.endpoint, payload)
      .pipe(catchError(this.errorHandler));
  }
  getUsers(page: number = 1, take: number = 100): Observable<User[]> {
    return this.http
      .get<User[]>(this.endpoint, {
        params: new HttpParams().set('page', page).set('take', take),
      })
      .pipe(catchError(this.errorHandler));
  }

  getUserById(id: number | string): Observable<User> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<User>(endpoint).pipe(catchError(this.errorHandler));
  }
}
