import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Welfare } from './welfare';
import {
  CustomDropdownControl,
  CustomTextboxControl,
  DynamicCustomFormControlBase,
} from '../../shared/form-control/form.service';
import {
  CustomListData,
  CustomTextData,
  DynamicCustomDataBase,
} from '../../shared/data-view/view.service';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class WelfaresService extends ApiService {
  protected override endpoint = `${this.API_URL}/groups`;

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

  getAllWelfares(): Observable<Welfare[]> {
    return this.http
      .get<Welfare[]>(this.endpoint, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getWelfareById(id: number | string) {
    return this.http
      .get<Welfare>(this.endpoint)
      .pipe(catchError(this.errorHandler));
  }
}