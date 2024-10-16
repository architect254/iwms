import { DOCUMENT, Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'iwms-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';

  @Input() editUrl: string = '';
  @Input() viewUrl: string = '';
  @Input() listUrl: string = '';

  @Input() displayBack: boolean = false;

  constructor(public location: Location) {}
}
