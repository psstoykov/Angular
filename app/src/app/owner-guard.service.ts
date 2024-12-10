import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ApiService } from './api.service';
import { UserService } from './user/user.service';
import { combineLatest, map, Observable } from 'rxjs';
import { User } from './types/user';
import { Post } from './types/posts';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OwnerGuardService implements CanActivate {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {}
  //
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //get the param via the build in method of canActivate
    const postId = route.params['pageId'];
    //combine 2 streams of data to be processed paralel with the combineLatest
    return combineLatest({
      user: this.userService.user$,
      post: this.apiService.getPostById(postId),
    }).pipe(
      map((combinedResult: { user: User; post: DocumentSnapshot }) => {
        const currentUserId = combinedResult.user.uid;
        const ownerId = (combinedResult.post.data() as Post).ownerId;

        if (ownerId !== currentUserId) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
