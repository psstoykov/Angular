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
  messageSignal = signal<string>('');
  passwordSignal = signal<string>('');
  usernameForm = this.fb.group({
    newUsername: ['', [Validators.required, Validators.minLength(3)]],
  });

  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(5)]],
    rePass: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmitUsername(): void {
    const { newUsername } = this.usernameForm.value;

    if (newUsername?.trim().length! < 3) {
      this.messageSignal.set('username must be at least 3 characters long');
      return;
    }
    this.messageSignal.set('');

    const obs = this.userService.updateProfile(
      newUsername as string,
      'displayName'
    );
    this.usernameForm.reset();
  }

  onSubmitPassword(): void {
    const { newPassword, rePass } = this.passwordForm.value;
    if (newPassword !== rePass) {
      this.passwordSignal.set('passwords must match');
      return;
    } else if (newPassword?.length! < 5) {
      this.passwordSignal.set('password must be at least 5 characters');
      return;
    }
    this.userService.updatePassword(newPassword!);
    this.passwordForm.reset();
  }
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
