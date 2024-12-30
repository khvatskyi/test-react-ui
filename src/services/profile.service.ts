import { IClientDefinitionInfo, IClientProfileInfo } from '../typings/models/client-info.models';
import { fetchWithAuth } from '../utilities/fetch-with-auth.utility';

//let PROFILE_DATA: IClientProfileInfo = {
//  id: '1',
//  name: 'Travelers',
//  description: 'Travelers Insurance is one of the largest and most established insurance companies in the United States, providing a wide array of property and casualty insurance products and services to businesses, organizations, and individuals. Founded in 1864, Travelers has built a reputation for financial strength, stability, and handling claims efficiently and fairly. The company focuses on innovation and comprehensive risk management to cater to the changing needs of its clients.',
//  industry: '13',
//  size: 'Large',
//  coreProducts: '',
//  strengths: ['Financial strength', 'Stability', 'Efficient claims handling'],
//  competitiveEdge: 'Focus on innovation and comprehensive risk management',
//  marketPosition: 'One of the largest and most established insurance companies in the US',
//  headquarters: '',
//  primaryLocations: null,
//  website: 'https://www.travelers.com',
//  linkedIn: 'https://linkedin.com/company/travelers',
//  xDotCom: 'https://twitter.com/travelers',
//  facebook: 'https://www.facebook.com/Travelers',
//  other: null,
//}

export async function getProfile(): Promise<IClientProfileInfo> {

  // MOCK data
  // return Promise.resolve(PROFILE_DATA);

  const path = process.env.REACT_APP_API_ROOT + '/user/profile';
  const response = await fetchWithAuth(path, {
    method: 'GET',
    credentials: 'include'
  });

  const result: IClientProfileInfo = await response.json();
  return result;
}

export async function saveProfile(profile: IClientDefinitionInfo): Promise<IClientProfileInfo> {

  // MOCK data
  //  PROFILE_DATA = structuredClone(profile);
  //  PROFILE_DATA.id = PROFILE_DATA.id ?? crypto.randomUUID();
  //  return Promise.resolve(PROFILE_DATA);

  const path = process.env.REACT_APP_API_ROOT + '/user/profile';
  const response = await fetchWithAuth(path, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(profile),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result: IClientProfileInfo = await response.json();
  return result;
}
