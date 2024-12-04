import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  providers: [ApiService],
  standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading = 'loading';
  constructor(private apiService: ApiService) {}
  posts: any = []; //set type any to solve issue

  ngOnInit() {
    const obs = this.apiService.getAllPosts();
    obs.subscribe((data) => data.forEach((doc) => this.posts.push(doc.data())));
  }
}
