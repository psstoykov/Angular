import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Database, get, ref, list, child } from '@angular/fire/database';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private db: Database,
    private auth: Auth
  ) {
    //Sign in new user
    // createUserWithEmailAndPassword(auth, 'niki@abv.bg', '123123').then(
    //   (userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     // ...
    //     console.log(user);
    //   }
    // );
    //get database ref
    // const dbRef = ref(this.db);
    //read from database
    // get(child(dbRef, 'Users')).then((info) => console.log(info.val()));

    signInWithEmailAndPassword(auth, 'nikii@abv.bg', '123123')
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
  }

  login(form: NgForm) {
    const { email, password } = form.value;
    console.log(email, password);
    form.reset();
  }
}
