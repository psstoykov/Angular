import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { User } from './types/user';
import { Post } from './types/posts';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private firestore: Firestore) {}

  // create a new document in collection "photographs"
  createPost(post: Post) {
    addDoc(collection(this.firestore, 'photographs'), post).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    });
  }

  //Get all posts
  getAllPosts() {
    const q = query(collection(this.firestore, 'photographs'));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=> ', doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Get latest posts

  //Get Post by Id

  //Edit post

  //Delete post
}
