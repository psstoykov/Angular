import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';

import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  isLoading = true;
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(() => {
      this.isLoading = false;
    });
  }
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
