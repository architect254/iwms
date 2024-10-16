import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicDataComponent } from './data.component';
import {
  DynamicCustomDataBase,
  DynamicCustomDataViewService,
} from './view.service';

@Component({
  standalone: true,
  selector: 'iwms-dynamic-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [DynamicCustomDataViewService],
  imports: [CommonModule, DynamicDataComponent],
})
export class DynamicViewComponent implements OnInit, OnDestroy {
  @Input() dataset: DynamicCustomDataBase<any>[] | null = [];

  constructor(private vds: DynamicCustomDataViewService) {
    this.vds;
  }

  ngOnInit() {
    // this.form = this.vds.toFormGroup(
    //   this.data as DynamicCustomDataViewBase<string>[]
    // );
  }

  ngOnDestroy(): void {}
}
