export interface IUserContext {
  accessToken: string;
  userName: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  picture: string;
  hasProfile: boolean;
}

export interface IUserResponse {
  access_token: string;
  username: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  has_profile: boolean;
}
