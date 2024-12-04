import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  providers: [ApiService],
  standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
