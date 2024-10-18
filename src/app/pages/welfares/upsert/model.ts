import { catchError, map, Observable, of, switchMap } from 'rxjs';
import {
  DynamicCustomFormControlBase,
  CustomTextboxControl,
  CustomDropdownControl,
  CustomSearchControl,
} from '../../../shared/components/form-control/model';
import { AccountsService } from '../../accounts/accounts.service';
import { ValueType } from '../../../shared/components/form-control/control.component';
import { WelfaresService } from '../welfares.service';

export function welfareDetailsFormControls(service: AccountsService) {
  const controls: DynamicCustomFormControlBase<ValueType>[] = [
    new CustomTextboxControl({
      key: 'name',
      label: 'Name',
      value: '',
      placeholder: 'Welfare Name',
      icon: 'badge',
      required: true,
      order: 1,
    }),
    new CustomTextboxControl({
      key: 'phone_number',
      label: 'Phone No.',
      value: '',
      placeholder: '0712345678',
      icon: 'call_log',
      required: true,
      order: 2,
    }),
    new CustomTextboxControl({
      key: 'email',
      label: 'Email',
      value: '',
      placeholder: 'a@a.com',
      icon: 'contact_mail',
      type: 'email',
      required: true,
      order: 3,
    }),
    new CustomSearchControl({
      key: 'manager',
      label: 'Manager',
      value: '',
      placeholder: 'John Doe',
      icon: 'manage_accounts',
      required: true,
      order: 4,
      search(name: string) {
        return service.getAccounts(1, 100, [['name', name]]).pipe(
          map((accounts) => {
            return accounts.map((account) => {
              return {
                id: account.id,
                name: account.name,
              };
            });
          })
        );
      },
    }),

    new CustomSearchControl({
      key: 'accountant',
      label: 'Accountant',
      value: '',
      placeholder: 'John Doe',
      icon: 'account_box',
      required: true,
      order: 5,
      search(name: string) {
        return service.getAccounts(1, 100, [['name', name]]).pipe(
          map((accounts) => {
            return accounts.map((account) => {
              return {
                id: account.id,
                name: account.name,
              };
            });
          })
        );
      },
    }),
    new CustomSearchControl({
      key: 'secretary',
      label: 'Secretary',
      value: '',
      placeholder: 'John Doe',
      icon: 'person_check',
      required: true,
      order: 4,
      search(name: string) {
        return service.getAccounts(1, 100, [['name', name]]).pipe(
          map((accounts) => {
            return accounts.map((account) => {
              return {
                id: account.id,
                name: account.name,
              };
            });
          })
        );
      },
    }),
  ];
  return of(controls.sort((a, b) => a.order - b.order));
}

export function chooseWelfareFormControls(
  service: WelfaresService
): Observable<DynamicCustomFormControlBase<ValueType>[]> {
  return service.getWelfares().pipe(
    map((welfares) => {
      return welfares.map((welfare) => {
        return { id: welfare?.id!, name: welfare?.name! };
      });
    }),
    switchMap((welfareOptions) => {
      return of([
        new CustomDropdownControl({
          key: 'id',
          label: 'Welfare Group',
          options: welfareOptions,
          icon: 'groups',
          required: false,
          order: 1,
        }) as DynamicCustomFormControlBase<ValueType>,
      ]);
    }),
    catchError((error) =>
      of([
        new CustomDropdownControl({
          key: 'id',
          label: 'Welfare Group',
          options: undefined,
          placeholder: 'There are no welfare groups currently. Create one',
          icon: 'groups',
          required: false,
          order: 1,
        }) as DynamicCustomFormControlBase<ValueType>,
      ])
    )
  );
}
