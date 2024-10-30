import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  inject,
  OnInit,
} from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { CdkObserveContent } from '@angular/cdk/observers';
import { Filter, FilterOption, StatusColors, StatusLabels } from '../model';

@Component({
  selector: 'iwms-grid-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    CdkObserveContent,
    CommonModule,
  ],
  providers: [MatDatepickerModule],
  templateUrl: './grid-search.component.html',
  styleUrl: './grid-search.component.scss',
})
export class GridSearchComponent implements OnInit {
  @Input() title!: string;
  @Input() filters!: FilterOption[];
  @Input() labels!: StatusLabels;
  @Input() colors!: StatusColors;

  @Output() applyFilter: EventEmitter<Filter[]> = new EventEmitter();

  filterControl: FormControl = new FormControl({
    updateOn: 'change',
  });
  selectedFilterControl: FormControl = new FormControl();

  selectedFilterOption: FilterOption | null = null;
  selectedFilterOptions: FilterOption[] = [];

  startDate = new Date(2000, 0, 1);
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(Date.now());

  private readonly document = inject(DOCUMENT);

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.selectedFilterControl.disable();
  }

  observeContent(mutations: MutationRecord[]) {
    const childAdded = mutations.find(
      (mutationRecord) => mutationRecord.type == 'childList'
    );
    if (childAdded) {
      this.document
        .getElementById('header')
        ?.setAttribute(
          'style',
          `margin-bottom:${
            15 +
            this.document.getElementById('selected-filter-options')
              ?.offsetHeight!
          }px`
        );
    }
  }

  onSelectFilterOption(option: FilterOption) {
    this.selectedFilterOption = option;

    this.selectedFilterControl.enable();

    this.cdr.detectChanges();
  }

  actOnFilterOption(option: FilterOption, action: string) {
    let selectedOption = this.selectedFilterOptions.find(
      (selectedOption) => selectedOption.key === option.key
    );

    switch (action) {
      case 'select':
        if (selectedOption) {
          const selectedOptionIndex =
            this.selectedFilterOptions.indexOf(selectedOption);

          selectedOption = this.selectedFilterOptions[selectedOptionIndex];
          this.selectedFilterOption = selectedOption;

          this.filterControl.setValue(selectedOption);
          this.selectedFilterControl.setValue(selectedOption.value);
          this.selectedFilterControl.enable();

          this.cdr.detectChanges();
        }
        break;
      case 'unselect':
        if (selectedOption) {
          this.selectedFilterOptions = this.selectedFilterOptions.filter(
            (searchOption) => searchOption.key !== selectedOption?.key
          );
        }
        break;

      default:
        break;
    }
  }

  addFilter() {
    if (this.selectedFilterOption?.type == 'date') {
      this.selectedFilterOption!.value = new Date(
        this.selectedFilterControl?.value
      ).toISOString();
    } else this.selectedFilterOption!.value = this.selectedFilterControl?.value;

    const selectedOption = this.selectedFilterOptions.find(
      (selectedOption) => selectedOption.key === this.selectedFilterOption?.key
    );

    if (selectedOption) {
      const selectedOptionIndex =
        this.selectedFilterOptions.indexOf(selectedOption);

      this.selectedFilterOptions[selectedOptionIndex] =
        this.selectedFilterOption!;
    } else {
      this.selectedFilterOptions.push(this.selectedFilterOption!);
    }

    this.selectedFilterOption = null;

    this.filterControl.setValue(null);
    this.selectedFilterControl.setValue(null);
    this.selectedFilterControl.disable();

    const filters = this.selectedFilterOptions.map((filter) => {
      return { key: filter.key, value: filter.value } as Filter;
    });

    this.applyFilter.emit(filters);
  }
}
