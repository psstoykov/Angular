import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  get username(): string {
    return this.userService.currentUserSignal()?.username!;
  }
}
