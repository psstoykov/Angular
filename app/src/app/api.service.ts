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

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private firestore: Firestore) {}

  // create a new document in collection "photographs"
  createPost(post: Post) {
    addDoc(collection(this.firestore, 'photographs'), post).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      return docRef;
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
  //Get Post by Id

  getPostById(id: string) {
    const docRef = doc(this.firestore, 'photographs', id);
    getDoc(docRef)
      .then((docSnap) => {
        console.log('Document data: ', docSnap.data());
        return docSnap.data();
      })
      .catch((error) => {
        console.log('No such document');
      });
  }
  //Get latest posts

  //Edit post

  //Delete post
}
