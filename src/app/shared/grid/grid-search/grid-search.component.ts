import { Component, Output, EventEmitter, Input } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, } from '@angular/material/select';

@Component({
  selector: 'lh-grid-search',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule],
  templateUrl: './grid-search.component.html',
  styleUrl: './grid-search.component.scss',
})
export class GridSearchComponent {
  @Input() searchOptions: any = [{ label: 'Name', value: 'name' }];
  @Output() search: EventEmitter<SearchEvent> = new EventEmitter();
}
export interface SearchEvent {
  options: SearchOption[];
}
export interface SearchOption {
  key: string;
  value: string;
}
