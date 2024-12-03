import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  providers: [ApiService],
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}
}
