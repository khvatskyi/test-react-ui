import { IProfileInfo } from '../pages/profile/Profile.models';

const BASE_PATH = process.env.REACT_APP_API_ROOT + '/api/profile';

export function getProfile(): Promise<IProfileInfo> {

  const response = fetch(BASE_PATH, {
    method: 'GET'
  });

  return response.then(x => x.json() as Promise<IProfileInfo>);
}

export function saveProfile(profile: IProfileInfo): Promise<IProfileInfo> {

  const response = fetch(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(profile)
  });

  return response.then(x => x.json() as Promise<IProfileInfo>);
}