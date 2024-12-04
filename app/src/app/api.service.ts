import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Post } from './types/posts';
import { from, Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { User } from './types/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private firestore: Firestore, private userService: UserService) {
    const user = this.userService.currentUserSignal();
  }

  // create a new document in collection "photographs"

  createPost(post: Post) {
    const promise = addDoc(collection(this.firestore, 'photographs'), post);
    promise.then(() => {});
    return from(promise);
  }

  //Get all posts
  getAllPosts() {
    const promise = getDocs(collection(this.firestore, 'photographs'));
    return from(promise); //converts to observable
  }
  //Get Post by Id

  // getPostById(id: string) {
  //   const docRef = doc(this.firestore, 'photographs', id);
  //   getDoc(docRef)
  //     .then((docSnap) => {
  //       console.log('Document data: ', docSnap.data());
  //       return docSnap.data();
  //     })
  //     .catch((error) => {
  //       console.log('No such document');
  //     });
  // }
  //Get latest posts

  //Edit post

  //Delete post
}
