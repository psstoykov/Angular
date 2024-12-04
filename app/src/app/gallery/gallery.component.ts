import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  posts: Post[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const obs = this.apiService.getAllPosts();
    obs.subscribe((data) =>
      data.forEach((doc) => {
        const data = doc.data() as Post;
        console.log(doc.data());
        data.id = doc.id;
        this.posts.push(data);
      })
    );

    const newDate = new Date();
    this.apiService.addComment(
      {
        createdAt: newDate,
        ownerId: '2323',
        text: 'hallo',
      },
      '7tdNUFhBeRqQ5LAp5Pcb'
    );
  }
}
