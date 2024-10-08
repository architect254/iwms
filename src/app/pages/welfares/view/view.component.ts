import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DynamicViewComponent } from '../../../shared/data-view/view.component';
import { DynamicCustomDataBase } from '../../../shared/data-view/view.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent],
  providers: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  pageTitle: string = '';
  dataView$: Observable<DynamicCustomDataBase<any>[]>;

  constructor(private route: ActivatedRoute, service: UsersService) {
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });
    this.dataView$ = service.getDataView();
  }
}
