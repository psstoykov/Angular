import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent, LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  get username(): string | undefined {
    return this.userService.currentUserSignal()?.username;
  }
}
