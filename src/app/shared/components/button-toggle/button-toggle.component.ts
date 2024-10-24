import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'iwms-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.scss',
  standalone: true,
  imports: [MatButtonToggleModule],
})
export class ButtonToggleComponent {
  @Input() name!: string;
  @Input() description!: string;

  @Input() options!: ToggleOption[];

  @Input() toggledOption!: ToggleOption;

  @Output() toggle = new EventEmitter();

  onToggle(option: ToggleOption) {
    this.toggledOption = option;
    this.toggle.emit(this.toggledOption);
  }
}
export interface ToggleOption {
  name: string;
  value: string;
}
