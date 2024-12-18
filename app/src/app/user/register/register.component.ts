import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private userService: UserService) {}
  errorMessage: string | null = null;
  register(form: NgForm) {
    const { email, username, password, repass } = form.value;
    if (password !== repass) {
      this.errorMessage = 'Passwords must match';
      return;
    }
    if (username.length < 3) {
      this.errorMessage = 'username must be at least 3 characters long';
      return;
    }
    this.userService
      .register(email.trim(), username.trim(), password.trim())
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }
}
