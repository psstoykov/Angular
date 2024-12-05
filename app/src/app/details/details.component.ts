import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../types/posts';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { Comment } from '../types/comment';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, FormsModule, LoaderComponent, UpperCasePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  commentSignal = signal<Comment[]>([]);
  commentArr: Comment[] = [];
  isLoading = true;
  photograph: Post[] = [];

  //TODO userId is lost when page reloads

  postId: string = '';
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public userService: UserService,
    private router: Router
  ) {}

  get isOwner(): boolean {
    if (
      this.userService.currentUserSignal()?.uid === this.photograph[0].ownerId
    ) {
      return true;
    } else {
      return false;
    }
  }

  deletePost(id: string) {
    this.apiService.deletePost(id);
    this.router.navigate(['/gallery']);
  }

  comment(form: NgForm) {
    const { text } = form.value;
    const userId = this.userService.currentUserSignal()?.uid;
    const date = new Date();
    const username = this.userService.currentUserSignal()?.username;
    if (form.invalid) {
      console.log('Invalid Comment');
      return;
    }

    this.apiService.addComment(
      { text, createdAt: date, ownerId: userId!, username: username! },
      this.postId
    );

    //TODO update signal when comment is added
    this.commentArr.unshift({
      text,
      createdAt: date,
      ownerId: userId!,
      username: username!,
    });
    this.commentSignal.set(this.commentArr);

    form.reset();
  }

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.params['postId'];

    const ob = this.apiService.getComments(this.postId);
    ob.then((rec) => {
      rec.forEach((comment) => {
        const result = comment.data() as Comment;

        //Set Comment signal here
        this.commentArr.push(result);
      });
      this.commentSignal.set(this.commentArr);
    });
    this.userService.user$.subscribe(() => {
      this.isLoading = false;
    });

    const obs = this.apiService.getPostById(this.postId);
    obs.subscribe((data) => {
      const post = data.data() as Post;

      this.photograph.push(post);
    });

    this.isLoading = false;
  }
}
