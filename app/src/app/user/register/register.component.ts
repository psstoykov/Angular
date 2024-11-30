import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router) {}
}
