import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicCustomDataBase } from './view.service';

@Component({
  standalone: true,
  selector: 'iwms-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  imports: [
    CommonModule,
  ],
})
export class DynamicDataComponent {
  @Input() data!: DynamicCustomDataBase<string>;
}
