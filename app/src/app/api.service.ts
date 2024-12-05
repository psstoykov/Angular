import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Post } from './types/posts';
import { from, Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { User } from './types/user';
import { Comment } from './types/comment';

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

  async addComment(comment: Comment, id: string) {
    const commentsRef = collection(
      this.firestore,
      'photographs',
      id,
      'comments'
    );
    await addDoc(commentsRef, comment);
  }
  //Get Post by Id

  getPostById(id: string) {
    const postRef = doc(this.firestore, 'photographs', id);
    const promise = getDoc(postRef);
    return from(promise);
  }
  //Get latest posts

  //Edit post

  //Delete post
}
