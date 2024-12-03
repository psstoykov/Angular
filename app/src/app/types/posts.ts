import { Comment } from './comment';

export interface Post {
  comments?: Comment[];
  title: string;
  url: string;
  description: string;
  createdAt: string;
  ownerId: string;
}
