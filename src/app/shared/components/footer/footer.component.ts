import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'iwms-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
  ],
})
export class FooterComponent {
  year = new Date().getFullYear();

  newsLetterForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newsLetterForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  submitForm() {}
}
