import { Comment } from './comment';

export interface Post {
  comments?: Comment[];
  title: string;
  url: string;
  description: string;
  currentDate: { seconds: number; nanoseconds: number };
  ownerId: string;
}
