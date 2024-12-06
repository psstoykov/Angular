import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  providers: [UserService],
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}
  errorMessage: string | null = null;
  login(form: NgForm) {
    const { email, password } = form.value;

    this.userService.login(email.trim(), password.trim()).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
