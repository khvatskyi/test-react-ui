export interface IUserContext {
  accessToken: string;
  refreshToken: string;
  userName: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  picture: string;
}

export interface IUserResponse {
  access_token: string;
  refresh_token: string;
  username: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}
