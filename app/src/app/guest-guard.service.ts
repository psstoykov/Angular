import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestGuardService {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(
      //filter for user !== undefiend
      filter((currentUser) => currentUser !== undefined),
      map((currentUser) => {
        if (!currentUser) {
          return true;
        }
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
