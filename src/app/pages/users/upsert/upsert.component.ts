import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { DynamicFormComponent } from '../../../shared/form-control/form.component';

import { DynamicCustomFormControlBase } from '../../../shared/form-control/form.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'iwms-upsert',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, DynamicFormComponent, MatButtonModule],
  providers: [],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent {
  pageTitle: string = '';
  userDetailsFormControls$: Observable<DynamicCustomFormControlBase<any>[]>;

  isProceedAllowed: boolean = false;

  payload: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService
  ) {
    this.route.data.subscribe((data: Data) => {
      this.pageTitle = data['title'];
    });
    this.userDetailsFormControls$ = this.service.getUserDetailsFormControls();
  }

  onValidityNotified(formData: string) {
    this.isProceedAllowed = true;
    this.payload = JSON.parse(formData);
  }

  save() {
    this.service.createUser(this.payload).subscribe({
      next: (value) => {
        console.log('saved', value);
        this.router.navigate(['../']);
      },
      error: (err) => {
        console.error('not saved', err);
      },
    });
  }
}
