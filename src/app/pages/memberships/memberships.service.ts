import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Membership } from './membership';
import {
  CustomDropdownControl,
  CustomTextboxControl,
  DynamicCustomFormControlBase,
} from '../../shared/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class MembershipsService extends ApiService {
  API_URL: string = `${this.BASE_URL}/membership`;

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

  getAllMemberships(): Observable<Membership[]> {
    return this.http
      .get<Membership[]>(this.API_URL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getMembershipById(membershipId: number | string) {
    this.$subscriptions$.add(
      this.http
        .get<Membership>(this.API_URL)
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
