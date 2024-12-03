export interface User extends UserInfo {
  readonly emailVerified: boolean;
  readonly isAnonymous: boolean;
  readonly metadata: UserMetadata;
  readonly providerData: UserInfo[];
  readonly refreshToken: string;
  readonly tenantId: string | null;
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

export interface UserInfo {
  readonly displayName: string | null;
  readonly email: string;
  readonly phoneNumber: string | null;
  readonly photoURL: string | null;
  readonly providerId: string;
  readonly uid: string;
}

export interface UserMetadata {
  readonly creationTime?: string;
  readonly lastSignInTime?: string;
}
