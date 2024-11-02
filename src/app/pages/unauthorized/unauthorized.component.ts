import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'iwms-unauthorized',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  constructor(public location: Location) {}
}
