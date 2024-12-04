import { Timestamp } from '@angular/fire/firestore';
import { Comment } from './comment';

export interface Post {
  comments?: Comment[];
  title: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  ownerId: string;
}
