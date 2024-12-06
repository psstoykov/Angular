import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Post } from '../types/posts';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [FormsModule, RouterLink, LoaderComponent],
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.css',
})
export class MyPageComponent implements OnInit {
  isLoading: boolean = true;
  userId: string = '';
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  posts = signal<Post[]>([]);

  username(form: NgForm) {
    const { username } = form.value;
    this.userService.updateProfile(username.trim(), 'displayName');
    form.reset();
  }

  ngOnInit() {
    this.userId = this.userService.currentUserSignal()?.uid!;

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const obs = this.apiService.getMyPosts(user.uid);
        obs.subscribe((snap) => {
          snap.forEach((doc) => {
            const data = doc.data() as Post;
            data.id = doc.id;
            this.posts.update((prevPosts) => [...prevPosts, data]);
          });
        });
      } else {
        return;
      }
    });

    this.isLoading = false;
  }
}
