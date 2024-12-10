import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Auth } from '@angular/fire/auth';

import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-create',
  providers: [ApiService],
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private auth: Auth
  ) {}

  error = signal<string>('');
  create(form: NgForm) {
    if (form.invalid) {
      this.error.set('form is invalid');

      return;
    }
    const { title, imageUrl, description } = form.value;
    const createdAt = Timestamp.now();
    if (!title.trim() || !imageUrl.trim() || !description.trim()) {
      this.error.set('all fields are required');
      return;
    }
    //get userId
    const ownerId = this.auth.currentUser?.uid!;
    const ownerUsername = this.auth.currentUser?.displayName;
    this.apiService.createPost({
      title,
      imageUrl,
      description,
      createdAt,
      ownerId,
      ownerUsername: ownerUsername!,
    });

    this.router.navigate(['/gallery']);
  }
}
