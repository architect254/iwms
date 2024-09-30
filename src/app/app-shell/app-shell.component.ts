import { Component } from '@angular/core';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {

}
