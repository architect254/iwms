import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Membership } from '../../../pages/users/entities/user.entity';
import { Role } from '../../../pages/users/entities/member.entity';

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

  @Input() value!: string;

  @Output() toggle = new EventEmitter();

  onToggle(option: ToggleOption) {
    this.value = option.value;
    this.toggle.emit(this.value);
  }
}
export interface ToggleOption {
  name: string;
  value: string;
  position: number;
}
