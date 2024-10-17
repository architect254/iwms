import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { CustomSearchControl } from '../model';
import { map, startWith, Subscription, switchMap } from 'rxjs';

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

  subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.valueChanges
        .pipe(
          startWith(''),
          map((name) => name.toLowerCase()),
          switchMap((name) => (<CustomSearchControl>this.control).search(name))
        )
        .subscribe((searchOptions) => {
          (<CustomSearchControl>this.control).options = searchOptions.map(
            (option) => {
              return { id: option.id, name: option.name };
            }
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
export type ValueType = string | number | Date;
