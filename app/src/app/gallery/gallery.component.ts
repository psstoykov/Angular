import { Component, computed, input, OnInit, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  posts = signal<Post[]>([]);
  search = signal<Post[]>([]);
  postId = input.required<string>(); //input signal for dynamic routing >>>postId is url param

  constructor(private apiService: ApiService, private firestore: Auth) {}

  searchFunc(event: Event) {
    const sq = (event.target as HTMLInputElement).value;
    //filter here
  }
  ngOnInit() {
    const obs = this.apiService.getAllPosts();
    obs.subscribe((data) =>
      data.forEach((doc) => {
        const data = doc.data() as Post;
        //TODO attach id to post in DB
        data.id = doc.id;

        this.posts.update((prevPosts) => [...prevPosts, data]);
      })
    );
  }
}
