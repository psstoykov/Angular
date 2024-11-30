import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor() {}
  create(form: NgForm) {
    return;
  }
}
