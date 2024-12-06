import { Component, input, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, FormsModule, LoaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  isLoading: boolean = true;
  pageId = input.required<string>(); //rouing using input signal
  posts = signal<Post[]>([]);
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  edit(form: NgForm) {
    const { title, imageUrl, description } = form.value;

    this.apiService.updatePost(
      this.pageId(),
      title.trim(),
      imageUrl.trim(),
      description.trim()
    );

    this.router.navigate(['gallery', this.pageId()]);
  }
  ngOnInit(): void {
    const obs = this.apiService.getPostById(this.pageId());
    obs.subscribe((data) => {
      this.posts.update((prev) => [...prev, data.data() as Post]);
    });

    this.isLoading = false;
  }
}
