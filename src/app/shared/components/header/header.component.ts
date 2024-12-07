import { DOCUMENT, Location } from '@angular/common';
import { booleanAttribute, Component, inject, Input } from '@angular/core';
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

  @Input() updateUrl: string = '';
  @Input() viewUrl: string = '';
  @Input() listUrl: string = '';

  @Input({ transform: booleanAttribute }) displayBack: boolean = false;

  constructor(public location: Location) {}
}
