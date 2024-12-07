import { Timestamp } from '@angular/fire/firestore';

export interface Comment {
  text: string;
  ownerId: string;
  createdAt: Timestamp;
  username: string;
}
