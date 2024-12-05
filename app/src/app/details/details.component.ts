import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../types/posts';
import { FormsModule, NgForm } from '@angular/forms';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import { User } from '../types/user';
import { LoaderComponent } from '../loader/loader.component';
import { from } from 'rxjs';

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
  //TODO userId is lost when page reloads
  userId: string = '';
  postId: string = '';
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public userService: UserService
  ) {}

  comment(form: NgForm) {
    const { text } = form.value; //comment value
    const userId = this.userService.currentUserSignal()?.uid; //userId
    const date = new Date(); //date
    console.log(date);
    //TODO sent comment to DB;

    this.apiService.addComment(
      { text, createdAt: date, ownerId: userId! },
      this.postId
    );
    form.reset();
  }

  ngOnInit() {
    this.userService.user$.subscribe(() => {
      this.isLoading = false;
    });
    this.postId = this.activatedRoute.snapshot.params['postId'];

    const obs = this.apiService.getPostById(this.postId);
    obs.subscribe((data) => {
      const post = data.data() as Post;

      this.photograph.push(post);
    });

    this.userId = this.userService.currentUserSignal()?.uid!; //TODO why I'm loosing the userId(it arrives too late)

    this.isLoading = false;
  }
}
