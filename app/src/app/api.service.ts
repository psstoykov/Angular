import { Injectable } from '@angular/core';
import {
  Firestore,
  OrderByDirection,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
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
  //sort by which criteria and which order
  getAllPosts(sortBy: string, order: OrderByDirection) {
    const q = query(
      collection(this.firestore, 'photographs'),
      orderBy(sortBy, order)
    );
    const promise = getDocs(q);
    return from(promise);
  }

  getMyPosts(uid: string) {
    const q = query(
      collection(this.firestore, 'photographs'),
      where('ownerId', '==', uid)
    );

    const promise = getDocs(q);
    return from(promise);
  }

  getLatestPosts() {
    const q = query(
      collection(this.firestore, 'photographs'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const promise = getDocs(q);
    return from(promise);
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

  //Get Comments

  async getComments(postId: string) {
    const q = query(
      collection(this.firestore, 'photographs', postId, 'comments'),
      orderBy('createdAt', 'desc')
    );
    const promise = getDocs(q);
    return promise;
  }
  //Get Post by Id

  getPostById(id: string) {
    const postRef = doc(this.firestore, 'photographs', id);
    const promise = getDoc(postRef);
    return from(promise);
  }
  //Get latest posts

  //update post

  async updatePost(
    id: string,
    title: string,
    imageUrl: string,
    description: string
  ) {
    const postRef = doc(this.firestore, 'photographs', id);
    await updateDoc(postRef, {
      title: title,
      imageUrl: imageUrl,
      description: description,
    });
  }
  //Delete post

  async deletePost(id: string) {
    await deleteDoc(doc(this.firestore, 'photographs', id));
  }
}
