export interface User {
  avatar: string;
  email: string;
  password: string;
  refreshToken?: string;
  roles?: [];
  username: string;
}
