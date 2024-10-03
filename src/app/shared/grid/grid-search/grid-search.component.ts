import { Component, Output, EventEmitter, Input } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'iwms-grid-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './grid-search.component.html',
  styleUrl: './grid-search.component.scss',
})
export class GridSearchComponent {
  @Input() title: string = '';
  @Input() filterOptions: any = [{ label: 'Name', value: 'name' },{ label: 'Age', value: 'age' },{ label: 'Status', value: 'status' }];
  @Output() search: EventEmitter<SearchEvent> = new EventEmitter();

  onSelectFilterOption(option: any) {}
}
export interface SearchEvent {
  options: SearchOption[];
}
export interface SearchOption {
  key: string;
  value: string;
}
