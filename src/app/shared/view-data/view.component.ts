import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicDataComponent } from './data.component';
import {
  DynamicCustomDataBase,
  DynamicCustomViewDataService,
} from './view.service';

@Component({
  standalone: true,
  selector: 'iwms-dynamic-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [DynamicCustomViewDataService],
  imports: [CommonModule, DynamicDataComponent],
})
export class DynamicViewComponent implements OnInit, OnDestroy {
  @Input() dataset: DynamicCustomDataBase<string>[] | null = [];

  constructor(private vds: DynamicCustomViewDataService) {}

  ngOnInit() {
    // this.form = this.vds.toFormGroup(
    //   this.data as DynamicCustomViewDataBase<string>[]
    // );
  }

  ngOnDestroy(): void {}
}
