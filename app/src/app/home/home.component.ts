import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  providers: [ApiService],
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const posts = this.apiService.getAllPosts().forEach((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data());
      });
    });
  }
}
