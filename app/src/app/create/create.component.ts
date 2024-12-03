import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create',
  providers: [ApiService],
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(private router: Router, private apiService: ApiService) {}
  create(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid Create form');
      form.reset();
      return;
    }
    const currentDate = new Date();
    this.apiService.createPost({ ...form.value, currentDate });
    this.router.navigate(['/home']);
  }
}
