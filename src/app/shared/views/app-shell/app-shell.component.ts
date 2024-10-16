import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'iwms-app-shell',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {

}
