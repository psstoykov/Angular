import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../types/posts';
import { FormsModule, NgForm } from '@angular/forms';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import { User } from '../types/user';
import { LoaderComponent } from '../loader/loader.component';
import { from } from 'rxjs';
import { Comment } from '../types/comment';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, FormsModule, LoaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  isLoading = true;
  photograph: Post[] = [];
  comments: Comment[] = [];

  //TODO userId is lost when page reloads
  userId: string = '';
  postId: string = '';
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public userService: UserService
  ) {}

  get isOwner(): boolean {
    if (this.userId === this.photograph[0].ownerId) {
      return true;
    } else {
      return false;
    }
  }

  deletePost(id: string) {
    console.log(id);
  }
  comment(form: NgForm) {
    const { text } = form.value; //comment value
    const userId = this.userService.currentUserSignal()?.uid; //userId
    const date = new Date(); //date
    const username = this.userService.currentUserSignal()?.username;
    if (form.invalid) {
      console.log('Invalid Comment');

      return;
    }

    this.apiService.addComment(
      { text, createdAt: date, ownerId: userId!, username: username! },
      this.postId
    );
    //TODO update component when comment is added
    form.reset();
    return;
  }

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.params['postId'];
    const ob = this.apiService.getComments(this.postId);
    ob.then((rec) => {
      rec.forEach((comment) => {
        const result = comment.data() as Comment;
        this.comments.push(result);
      });
    });
    this.userService.user$.subscribe(() => {
      this.isLoading = false;
    });

    const obs = this.apiService.getPostById(this.postId);
    obs.subscribe((data) => {
      const post = data.data() as Post;

      this.photograph.push(post);
    });

    this.userId = this.userService.currentUserSignal()?.uid!; //TODO why I'm loosing the userId(it arrives too late)

    this.isLoading = false;
  }
}
