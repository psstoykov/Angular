import { inject, Injectable, input, OnInit, signal } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { UserService } from './user/user.service';
import { ApiService } from './api.service';
import { Post } from './types/posts';
import { map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerGuardService implements CanActivate, OnInit {
  postId: string = '';
  currentUserId: string = '';
  constructor(
    private router: Router,
    private UserService: UserService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}
  ownerId: string = '';

  canActivate(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  Observable<boolean> {
    return this.apiService.getPostById(this.postId).pipe(
      map((snap) => {
        const result: Post = snap.data() as Post;
        this.ownerId = result.ownerId;
        if (this.ownerId !== this.currentUserId) {
          console.log(this.ownerId, this.currentUserId, this.postId);
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
  ngOnInit(): void {
    this.postId = this.route.snapshot.params['postId'];
    this.currentUserId = this.UserService.currentUserSignal()?.uid!;
  }
}
