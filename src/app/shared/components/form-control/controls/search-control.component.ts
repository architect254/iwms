import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { CustomSearchControl } from '../model';
import { map, startWith, Subscription, switchMap, tap } from 'rxjs';
import { AccountsService } from '../../../../pages/accounts/accounts.service';

@Component({
  standalone: true,
  selector: 'iwms-search-control',
  templateUrl: './search-control.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class CustomSearchControlComponent implements OnInit, OnDestroy {
  @Input() control!: CustomSearchControl;
  @Input() form!: FormGroup;

  private _accountsService = inject(AccountsService);

  subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.controls[this.control.key].valueChanges
        .pipe(
          startWith(this.control.value ? this.control.value : ''),
          map((id_number) => id_number.toLowerCase()),
          switchMap((id_number) => {
            return this._accountsService.getAccounts(1, 10, 'all', [
              { key: 'id_number', value: id_number },
            ]);
          })
        )
        .subscribe(
          (accountOptions) =>
            (this.control.options = accountOptions.map((account) => {
              return { id: account.id_number, name: account.name };
            }))
        )
    );
  }

  displayFn(id: number) {
    const correspondingOption = Array.isArray(this.control.options)
      ? this.control.options.find((option) => option.id === id)
      : null;
    return correspondingOption ? correspondingOption.name : '';
  }

  selectSearchOption(option: { id: string | number; name: string }) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
export type ValueType = string | number | Date;
