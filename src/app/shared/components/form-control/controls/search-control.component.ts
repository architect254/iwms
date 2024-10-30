import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { CustomSearchControl, SearchDto, SearchOption } from '../model';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  Subscription,
  switchMap,
} from 'rxjs';

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
export class CustomSearchControlComponent<T> implements OnInit, OnDestroy {
  @Input() control!: CustomSearchControl;
  @Input() form!: FormGroup;

  filteredOptions!: SearchOption[];
  selectedOption!: SearchOption;

  private _service = inject(this.control.service);

  // this._auto.autocomplete.options[whatever].select();

  subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.controls[this.control.key].valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(10),
          filter((searchText) => !!searchText),
          switchMap((searchText) => {
            let searchDto: SearchDto = { term: searchText, skip: 0, take: 10 };
            return this._service.search(searchDto).pipe(
              catchError((err) => {
                if (err.error.status === 404) {
                  return of([
                    { id: '', name: `--- No results for: ${searchText} ---` },
                  ]);
                } else return [];
              })
            );
          })
        )
        .subscribe(
          (options: SearchOption[]) => (this.filteredOptions = options)
        )
    );
  }

  onNew() {}

  displayFn(id: string): string {
    return this.filteredOptions.find((option) => option.id == id)?.name || '';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
