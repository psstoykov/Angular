import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from '../../loader/loader.component';
import { RouterLink } from '@angular/router';
import { onAuthStateChanged, User } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent, LoaderComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UserService, private auth: Auth) {}
  user: User | null = null;
  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }
}
