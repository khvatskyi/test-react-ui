import { IProfileInfo } from '../pages/profile/Profile.models';

const BASE_PATH = process.env.REACT_APP_API_ROOT + '/api/profile';



let PROFILE_DATA: IProfileInfo = {
  id: '1',
  name: 'Travelers',
  description: 'Travelers Insurance is one of the largest and most established insurance companies in the United States, providing a wide array of property and casualty insurance products and services to businesses, organizations, and individuals. Founded in 1864, Travelers has built a reputation for financial strength, stability, and handling claims efficiently and fairly. The company focuses on innovation and comprehensive risk management to cater to the changing needs of its clients.',
  industry: '13',
  size: 'Large',
  coreProducts: '',
}

export function getProfile(): Promise<IProfileInfo> {

  // MOCK data
  return Promise.resolve(PROFILE_DATA);

  const response = fetch(BASE_PATH, {
    method: 'GET'
  });

  return response.then(x => x.json() as Promise<IProfileInfo>);
}

export function saveProfile(profile: IProfileInfo): Promise<IProfileInfo> {

  // MOCK data
  PROFILE_DATA = structuredClone(profile);
  PROFILE_DATA.id = PROFILE_DATA.id ?? crypto.randomUUID();
  return Promise.resolve(PROFILE_DATA);

  const response = fetch(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(profile)
  });

  return response.then(x => x.json() as Promise<IProfileInfo>);
}