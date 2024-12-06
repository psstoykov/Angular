import { inject, Injectable, signal } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  getAuth,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  auth = inject(Auth);
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  //signal for current user
  currentUserSignal = signal<User | null | undefined>(undefined);
  userId$ = this.currentUserSignal()?.uid!;

  getUserId() {
    const user = this.auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
    return null;
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => {
      //update display name in user profile
      //more update options available
      updateProfile(response.user, { displayName: username });
    });
    //convert to observable
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
      //returns UserCredential, therefore resolving to empty function
    ).then(() => {});
    //convert to observable
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    //convert to observable
    return from(promise);
  }
  //update profile
  updateProfile(newValue: string, field: string) {
    updateProfile(this.auth.currentUser!, { [field]: newValue })
      .then(() => {
        //profile updated
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            const uid = user.uid;
            const username = user.displayName;
            const email = user.email;
            this.currentUserSignal.set({ uid, username, email } as User);
          } else {
            // User is signed out
            // ...
          }
        });
      })
      .catch((error) => {
        return error;
      });
  }
}
