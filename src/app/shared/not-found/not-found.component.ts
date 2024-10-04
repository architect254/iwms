import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'iwms-page-not-found',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(public location: Location) {}
}
