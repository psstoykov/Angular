import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostGuardService implements CanMatch {
  constructor(private apiService: ApiService) {}
  //interface to match non excisting routes with parameter
  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const postId = segments[1].path;
    return this.apiService.getPostById(postId).pipe(
      map((post: DocumentSnapshot) => {
        //return true or false for route matching
        return post.exists();
      })
    );
  }
}
