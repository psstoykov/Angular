import {
  Component,
  computed,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { DateTransform } from '../date.transoform.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, FormsModule, DateTransform, DatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  posts = signal<Post[]>([]);
  result: Post[] = [];
  sq = signal<string>('');

  constructor(private apiService: ApiService, private firestore: Auth) {}
  searchFunc(event: Event) {
    this.posts.set(this.result);
    this.sq.set((event.target as HTMLInputElement).value);

    this.posts.set(
      this.posts().filter(
        (post) =>
          post.title.toLowerCase().includes(this.sq().toLowerCase()) ||
          post.description.toLowerCase().includes(this.sq().toLowerCase()) ||
          post.ownerUsername.toLowerCase().includes(this.sq().toLowerCase())
      )
    );
  }

  sortByUser() {
    this.result = [];
    const obs = this.apiService.getAllPosts('ownerUsername', 'asc');
    obs.subscribe((data) =>
      data.forEach((doc) => {
        const data = doc.data() as Post;
        //TODO attach id to post in DB
        data.id = doc.id;

        this.result.push(data);
      })
    );
    this.posts.set(this.result);
  }
  sortByNewest() {
    this.result = [];
    const obs = this.apiService.getAllPosts('createdAt', 'desc');
    obs.subscribe((data) =>
      data.forEach((doc) => {
        const data = doc.data() as Post;
        //TODO attach id to post in DB
        data.id = doc.id;

        this.result.push(data);
      })
    );
    this.posts.set(this.result);
  }
  sortByOlderst() {
    this.result = [];
    const obs = this.apiService.getAllPosts('createdAt', 'asc');
    obs.subscribe((data) =>
      data.forEach((doc) => {
        const data = doc.data() as Post;
        //TODO attach id to post in DB
        data.id = doc.id;

        this.result.push(data);
      })
    );
    this.posts.set(this.result);
  }
  ngOnInit() {
    this.result = [];
    const obs = this.apiService.getAllPosts('createdAt', 'desc');
    obs.subscribe((data) =>
      data.forEach((doc) => {
        const data = doc.data() as Post;
        //TODO attach id to post in DB
        data.id = doc.id;

        this.result.push(data);
      })
    );
    this.posts.set(this.result);
    this.result = this.posts();
  }
}
