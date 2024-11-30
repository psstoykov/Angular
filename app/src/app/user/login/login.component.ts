import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService
  ) {}

  login(form: NgForm) {
    console.log('login');
    if (form.invalid) {
      console.error('Invalid Register form');
      form.reset();
      return;
    }
    this.apiService.createUser();
    const { email, password } = form.value;
    this.userService.login(email, password);
    this.router.navigate(['/home']);
  }
}
