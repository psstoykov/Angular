import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../types/posts';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  photograph: Post[] = [];
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params['postId'];
    const obs = this.apiService.getPostById(postId);
    obs.subscribe((data) => {
      const post = data.data() as Post;
      this.photograph.push(post);
      console.log(this.photograph);
    });
  }
}
