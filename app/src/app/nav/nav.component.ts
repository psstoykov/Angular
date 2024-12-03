import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../types/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private router: Router) {}

  userService = inject(UserService);
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
