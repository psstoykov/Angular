import { Component, input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  postId = input.required<string>(); //input signal for dynamic routing >>>postId is url param
  posts: Post[] = [];
  constructor(private apiService: ApiService, private firestore: Auth) {}

  ngOnInit() {
    const obs = this.apiService.getAllPosts();
    obs.subscribe((data) =>
      data.forEach((doc) => {
        const data = doc.data() as Post;
        data.id = doc.id;
        //TODO attach id to picture in DB

        this.posts.push(data);
      })
    );
  }
}
