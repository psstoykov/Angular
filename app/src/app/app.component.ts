import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { UserService } from './user/user.service';

import { User } from './types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.user$.subscribe(
      (user: { email: string; displayName: string }) => {
        if (user) {
          this.userService.currentUserSignal.set({
            email: user.email!,
            username: user.displayName!,
          });
          console.log(this.userService.currentUserSignal());
        } else {
          this.userService.currentUserSignal.set(null);
        }
      }
    );
  }
}
