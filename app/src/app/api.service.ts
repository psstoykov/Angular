import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private firestore: Firestore) {}

  createUser() {
    addDoc(collection(this.firestore, 'users'), {
      username: 'Petar',
      email: 'pesho@abv.bg',
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
