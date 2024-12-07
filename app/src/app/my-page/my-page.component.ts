import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Post } from '../types/posts';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { validatePassword } from '@angular/fire/auth';
import { DateTransform } from '../date.transoform.pipe';
import { User } from '../types/user';
import { UserInfo } from '../types/userInfo';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent,
    ReactiveFormsModule,
    NgIf,
    DatePipe,
    DateTransform,
    AsyncPipe,
  ],
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.css',
})
export class MyPageComponent implements OnInit {
  isLoading: boolean = true;
  userId: string = '';
  fb = inject(NonNullableFormBuilder);

  userinfo: UserInfo | undefined = undefined;
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}
  usernameForm = this.fb.group({
    newUsername: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmitUsername(): void {
    const { newUsername } = this.usernameForm.value;

    const obs = this.userService.updateProfile(
      newUsername as string,
      'displayName'
    );
    this.usernameForm.reset();
  }

  // registerForm = this.fb.group({
  //   newPassword: [
  //     '',
  //     [validatePassword, Validators.required, Validators.minLength(5)],
  //   ],
  //   rePass: [
  //     '',
  //     [validatePassword, Validators.required, Validators.minLength(5)],
  //   ],
  // });
  posts = signal<Post[]>([]);

  ngOnInit() {
    this.userId = this.userService.currentUserSignal()?.uid!;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userinfo = {
          createAt: user.metadata.creationTime!,
          lastLoginAt: user.metadata.lastSignInTime!,
        };
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
