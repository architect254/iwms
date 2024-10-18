import { Injectable } from '@angular/core';
import { Welfare } from './model';
import {
  CustomDropdownControl,
  CustomTextboxControl,
  DynamicCustomFormControlBase,
} from '../../shared/components/form-control/model';
import {
  CustomListData,
  CustomTextData,
  DynamicCustomDataBase,
} from '../../shared/components/data-view/view.service';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { FilterRequest } from './list/model';

@Injectable({
  providedIn: 'root',
})
export class WelfaresService extends ApiService {
  protected override endpoint = `${this.API_URL}/welfares`;

  constructor() {
    super();
  }

  getPersonalDetailsFormControls() {
    const controls: DynamicCustomFormControlBase<string>[] = [
      new CustomTextboxControl({
        key: 'firstName',
        label: 'First name',
        value: '',
        placeholder: 'John',
        icon: 'badge',
        required: true,
        order: 1,
      }),
      new CustomTextboxControl({
        key: 'surname',
        label: 'Surname',
        value: '',
        placeholder: 'Doe',
        icon: 'badge',
        required: true,
        order: 2,
      }),
      new CustomTextboxControl({
        key: 'idNumber',
        label: 'National ID No.',
        value: '',
        placeholder: '12345678',
        icon: 'fingerprint',
        required: true,
        order: 3,
      }),
      new CustomTextboxControl({
        key: 'phoneNo',
        label: 'Phone No.',
        value: '',
        placeholder: '0712345678',
        icon: 'call_log',
        required: true,
        order: 4,
      }),
      new CustomTextboxControl({
        key: 'emailAddress',
        label: 'Email',
        value: '',
        placeholder: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 5,
      }),
      new CustomDropdownControl({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { id: 'cat', name: 'Cat' },
          { id: 'dog', name: 'Dog' },
          { id: 'horse', name: 'Horse' },
          { id: 'capybara', name: 'Capybara' },
        ],
        icon: 'checklist',
        order: 3,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }
  getMaritalDetailsFormControls() {
    const controls: DynamicCustomFormControlBase<string>[] = [
      new CustomTextboxControl({
        key: 'firstName',
        label: 'First name',
        value: '',
        placeholder: 'John',
        icon: 'badge',
        required: true,
        order: 1,
      }),
      new CustomTextboxControl({
        key: 'surname',
        label: 'Surname',
        value: '',
        placeholder: 'Doe',
        icon: 'badge',
        required: true,
        order: 2,
      }),
      new CustomTextboxControl({
        key: 'idNumber',
        label: 'National ID No.',
        value: '',
        placeholder: '12345678',
        icon: 'fingerprint',
        required: true,
        order: 3,
      }),
      new CustomTextboxControl({
        key: 'phoneNo',
        label: 'Phone No.',
        value: '',
        placeholder: '0712345678',
        icon: 'call_log',
        required: true,
        order: 4,
      }),
      new CustomTextboxControl({
        key: 'emailAddress',
        label: 'Email',
        value: '',
        placeholder: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 5,
      }),
      new CustomDropdownControl({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { id: 'cat', name: 'Cat' },
          { id: 'dog', name: 'Dog' },
          { id: 'horse', name: 'Horse' },
          { id: 'capybara', name: 'Capybara' },
        ],
        icon: 'checklist',
        order: 3,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }
  getFamiyDetailsFormControls() {
    const controls: DynamicCustomFormControlBase<string>[] = [
      new CustomTextboxControl({
        key: 'firstName',
        label: 'First name',
        value: '',
        placeholder: 'John',
        icon: 'badge',
        required: true,
        order: 1,
      }),
      new CustomTextboxControl({
        key: 'surname',
        label: 'Surname',
        value: '',
        placeholder: 'Doe',
        icon: 'badge',
        required: true,
        order: 2,
      }),
      new CustomTextboxControl({
        key: 'idNumber',
        label: 'National ID No.',
        value: '',
        placeholder: '12345678',
        icon: 'fingerprint',
        required: true,
        order: 3,
      }),
      new CustomTextboxControl({
        key: 'phoneNo',
        label: 'Phone No.',
        value: '',
        placeholder: '0712345678',
        icon: 'call_log',
        required: true,
        order: 4,
      }),
      new CustomTextboxControl({
        key: 'emailAddress',
        label: 'Email',
        value: '',
        placeholder: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 5,
      }),
      new CustomDropdownControl({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { id: 'cat', name: 'Cat' },
          { id: 'dog', name: 'Dog' },
          { id: 'horse', name: 'Horse' },
          { id: 'capybara', name: 'Capybara' },
        ],
        icon: 'checklist',
        order: 3,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getDataView() {
    const data: DynamicCustomDataBase<string>[] = [
      new CustomTextData({
        key: 'firstName',
        label: 'First name',
        value: 'John',
        icon: 'badge',
        order: 1,
      }),
      new CustomTextData({
        key: 'surname',
        label: 'Surname',
        value: 'Doe',
        icon: 'badge',
        order: 2,
      }),
      new CustomTextData({
        key: 'idNumber',
        label: 'National ID No.',
        value: '12345678',
        icon: 'fingerprint',
        order: 3,
      }),
      new CustomTextData({
        key: 'phoneNo',
        label: 'Phone No.',
        value: '0712345678',
        icon: 'call_log',
        order: 4,
      }),
      new CustomTextData({
        key: 'emailAddress',
        label: 'Email',
        value: 'a@a.com',
        icon: 'contact_mail',
        type: 'email',
        order: 5,
      }),
      new CustomListData({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { label: 'cat', value: 'Cat' },
          { label: 'dog', value: 'Dog' },
          { label: 'horse', value: 'Horse' },
          { label: 'capybara', value: 'Capybara' },
        ],
        icon: 'checklist',
        order: 3,
      }),
    ];
    return of(data.sort((a, b) => a.order - b.order));
  }

  createWelfare(payload: any): Observable<Welfare> {
    return this.http.post<Welfare>(this.endpoint, payload);
  }

  updateWelfare(id: number | string, payload: any): Observable<Welfare> {
    const endpoint = this.endpoint + '/' + id;
    return this.http.put<Welfare>(endpoint, payload);
  }

  getWelfares(
    page: number = 1,
    take: number = 100,
    filters?: [string, string][]
  ): Observable<Welfare[]> {
    return this.http.get<Welfare[]>(this.endpoint, {
      params: new HttpParams().set('page', page).set('take', take),
    });
  }

  getWelfareById(id: number | string): Observable<Welfare> {
    const endpoint = `${this.endpoint}/${id}`;
    return this.http.get<Welfare>(endpoint);
  }
}
