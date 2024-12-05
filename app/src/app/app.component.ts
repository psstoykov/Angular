import { Component, inject, OnInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { UserService } from './user/user.service';
import { LoaderComponent } from './loader/loader.component';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private auth: Auth) {}
  ngOnInit(): void {
    this.userService.user$.subscribe(
      (user: { email: string; displayName: string; uid: string }) => {
        if (user) {
          this.userService.currentUserSignal.set({
            email: user.email!,
            username: user.displayName!,
            uid: this.auth.currentUser?.uid,
          });
          console.log(this.userService.currentUserSignal());
        } else {
          this.userService.currentUserSignal.set(null);
        }
      }
    );
  }
}
