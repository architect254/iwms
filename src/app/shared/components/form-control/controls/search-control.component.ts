import {
  ChangeDetectorRef,
  Component,
  EnvironmentInjector,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  runInInjectionContext,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import {
  CustomSearchControl,
  Searchable,
  SearchDto,
  SearchOption,
} from '../model';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'iwms-search-control',
  templateUrl: './search-control.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class CustomSearchControlComponent implements OnChanges, OnDestroy {
  @Input() control!: CustomSearchControl;
  @Input() form!: FormGroup;

  filteredOptions!: SearchOption[];

  private _service!: Searchable;

  isLoading = false;

  private searchText = '';
  private selectedOption!: any;

  // this._auto.autocomplete.options[whatever].select();

  subscriptions = new Subscription();

  constructor(
    private injector: EnvironmentInjector,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(): void {
    if (this.control) {
      this._service = runInInjectionContext(this.injector, () =>
        inject(this.control!.service)
      );
    }
    this.subscriptions.add(
      this.form.controls[this.control.key].valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(10),
          filter((searchText) => !!searchText),
          switchMap((searchText) => {
            this.isLoading = true;

            this.searchText = searchText;
            let searchDto: SearchDto = { term: searchText, page: 1, take: 10 };
            return this._service.search(searchDto).pipe(tap(() => {}));
          })
        )
        .subscribe(
          (options: SearchOption[]) => {
            this.isLoading = false;

            if (options.length) {
              this.filteredOptions = options;
              this.cdr.detectChanges();
            }
          },
          (error) => {
            this.isLoading = false;

            this.filteredOptions = [
              { id: '', name: `--- No results found ---` },
            ];
          }
        )
    );
  }

  onNew() {}

  // displayFn(id: string) {
  //   this.selectedOption = this.filteredOptions?.find(
  //     (option) => option.id == id
  //   );
  //   return this.selectedOption?.name || '';
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
