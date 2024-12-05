import { Component, input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  postId = input.required<string>();
  constructor(private activatedRoute: ActivatedRoute) {}
  edit(form: NgForm) {
    console.log(form.value);
  }
  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['postId'];
    console.log(this.postId);
    //get postbyId and fill form values
  }
}
