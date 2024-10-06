import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Membership } from './membership';
import {
  CustomDateControl,
  CustomDropdownControl,
  CustomTextboxControl,
  DynamicCustomFormControlBase,
} from '../../shared/form-control/form.service';
import {
  CustomListData,
  CustomTextData,
  DynamicCustomDataBase,
} from '../../shared/view-data/view.service';

@Injectable({
  providedIn: 'root',
})
export class MembershipsService extends ApiService {
  protected override endpoint = `${this.API_URL}/memberships`;

  $memberships: BehaviorSubject<Membership[]> = new BehaviorSubject<
    Membership[]
  >([]);

  constructor() {
    super();
  }

  get memberships$(): Observable<Membership[]> {
    return this.$memberships.asObservable();
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
          { key: 'cat', value: 'Cat' },
          { key: 'dog', value: 'Dog' },
          { key: 'horse', value: 'Horse' },
          { key: 'capybara', value: 'Capybara' },
        ],
        icon: 'checklist',
        order: 3,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }
  getSpouseDetailsFormControls() {
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
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }
  getFamilyDetailsFormControls() {
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
      new CustomDateControl({
        key: 'birth_date',
        label: 'Birth Date',
        value: '',
        placeholder: '11/07/2000',
        icon: 'cake',
        required: true,
        order: 3,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getViewData() {
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

  getAllMemberships(): Observable<Membership[]> {
    return this.http
      .get<Membership[]>(this.endpoint, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getMembershipById(membershipId: number | string) {
    this.$subscriptions$.add(
      this.http
        .get<Membership>(this.endpoint)
        .pipe(catchError(this.errorHandler))
        .subscribe((membership: Membership) => {
          this.$memberships.next([...this.$memberships.getValue(), membership]);
        })
    );
  }

  selectAllMembershipsDummy(): void {
    this.$subscriptions$.add(
      this.getAllMemberships().subscribe((memberships: Membership[]) => {
        this.$memberships.next(memberships);
      })
    );
  }
}
