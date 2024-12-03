import { Injectable, OnDestroy } from '@angular/core';

import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { userForAuth } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<userForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: userForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private auth: Auth) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        //Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        //Signed up
        const user = userCredential.user;

        //  ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
}
