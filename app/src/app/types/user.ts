export interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  posts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileDetails {
  username: string;
  email: string;
}

export interface userForAuth {
  username: string;
  email: string;
  password: string;
  id: string;
}
