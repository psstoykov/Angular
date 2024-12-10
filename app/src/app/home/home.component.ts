import { Component, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';

@Component({
  selector: 'app-home',
  providers: [ApiService],
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pageId = input.required<string>();
  posts = signal<Post[]>([]);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const obs = this.apiService.getLatestPosts();
    obs.subscribe((data) => {
      data.forEach((doc) => {
        const result = doc.data() as Post;
        result.id = doc.id;
        this.posts.update((prev) => [...prev, result]);
      });
    });
  }
}
