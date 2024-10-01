import { Component, Input } from "@angular/core";

@Component({
  selector: 'iwms-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
}
