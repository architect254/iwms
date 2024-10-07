import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DynamicViewComponent } from '../../../shared/view-data/view.component';
import { DynamicCustomDataBase } from '../../../shared/view-data/view.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicViewComponent, JsonPipe],
  providers: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  pageTitle: string = '';
  user!: { [key: string]: string | number | Date };
  viewData$: Observable<DynamicCustomDataBase<string | number | Date>[]>;

  constructor(private route: ActivatedRoute, service: UsersService) {
    this.viewData$ = service.getViewData();
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
      this.user = data['user'];
    });
  }
  ngOnInit(): void {
    this.viewData$.forEach((viewData) => {
      viewData.forEach((view, index) => {
        if (view) {
          view.value = this.user[view.key];
        }
      });
    });
  }
}
