import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.css',
})
export class MyPageComponent {
  constructor(private userService: UserService) {}

  username(form: NgForm) {
    const { username } = form.value;
    this.userService.updateProfile(username.trim(), 'displayName');
    form.reset();
  }
}
