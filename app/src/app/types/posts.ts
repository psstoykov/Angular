export interface Post {
  comments?: {
    text: string;
    ownerId: string;
  };
  title: string;
  url: string;
  description: string;
  createdAt: string;
  ownerId: string;
}
