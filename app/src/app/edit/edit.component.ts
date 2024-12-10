import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { ApiService } from '../api.service';
import { Post } from '../types/posts';
import { LoaderComponent } from '../loader/loader.component';
import { User } from '../types/user';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, LoaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  user!: User;
  route = inject(ActivatedRoute);
  isLoading: boolean = true;
  pageId = input.required<string>(); //rouing using input signal
  post!: Post;
  constructor(
    private apiService: ApiService,

    private router: Router
  ) {}

  error = signal<string>('');
  edit(form: NgForm) {
    const { title, imageUrl, description } = form.value;
    if (form.invalid) {
      if (!title.trim() || !imageUrl.trim() || !description.trim()) {
        this.error.set('all fields are required');
        return;
      }
      this.error.set('form is invalid');
      return;
    }

    this.apiService.updatePost(
      this.pageId(),
      title.trim(),
      imageUrl.trim(),
      description.trim()
    );

    this.router.navigate(['gallery', this.pageId()]);
  }
  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    const obs = this.apiService.getPostById(this.pageId());

    obs.subscribe((data) => {
      this.post = data.data() as Post;
      console.log('hereeee');
    });
    this.isLoading = false;
  }
}
