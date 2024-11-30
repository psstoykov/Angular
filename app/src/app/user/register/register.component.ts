import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private userService: UserService) {}

  register(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid Register form');
      form.reset();
      return;
    }

    const { email, password } = form.value;
    this.userService.register(email, password);
    this.router.navigate(['/home']);
  }
}
