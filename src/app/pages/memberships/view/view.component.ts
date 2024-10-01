import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'iwms-view',
  standalone: true,
  imports: [AsyncPipe],
  providers: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {}