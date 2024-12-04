import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-create',
  providers: [ApiService],
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private auth: Auth
  ) {}
  create(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid Create form');
      form.reset();
      return;
    }
    const { title, imageUrl, description } = form.value;
    const createdAt = new Date();

    //get userId
    const ownerId = this.auth.currentUser?.uid!;

    this.apiService.createPost({
      title,
      imageUrl,
      description,
      createdAt,
      ownerId,
    });
    this.router.navigate(['/home']);
  }
}
