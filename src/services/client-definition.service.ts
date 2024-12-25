import { delay } from '@epam/uui-test-utils';
import { IClientDefinitionInfo } from '../pages/client-definition/ClientDefinition.models';
import { IClientProfileInfo, IExtendedClientProfileInfo } from '../pages/client-profile/ClientProfile.models';

//let CLIENT_DEFINITION_DATA: IClientDefinitionInfo = {
//  id: '1',
//  name: 'Travelers',
//  description: 'Travelers Insurance is one of the largest and most established insurance companies in the United States, providing a wide array of property and casualty insurance products and services to businesses, organizations, and individuals. Founded in 1864, Travelers has built a reputation for financial strength, stability, and handling claims efficiently and fairly. The company focuses on innovation and comprehensive risk management to cater to the changing needs of its clients.',
//  industry: '13',
//  size: 'Large',
//  coreProducts: '',
//}

//let PROFILE_DATA: IExtendedClientProfileInfo = {
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

export function getClientDefinition(): Promise<IClientDefinitionInfo> {

  // MOCK data
// return Promise.resolve(CLIENT_DEFINITION_DATA);

  const path = process.env.REACT_APP_API_ROOT + '/user/client-definition';
  const response = fetch(path, {
    method: 'GET',
    credentials: 'include'
  });

  return response.then(x => x.json() as Promise<IClientDefinitionInfo>);
}

export function saveClientDefinition(clientDefinition: IClientProfileInfo): Promise<IExtendedClientProfileInfo> {

  // MOCK data
// PROFILE_DATA = {...PROFILE_DATA, ...structuredClone(clientDefinition)};
// PROFILE_DATA.id = PROFILE_DATA.id ?? crypto.randomUUID();
// return delay(3000).then(() => Promise.resolve(PROFILE_DATA));

  const path = process.env.REACT_APP_API_ROOT + '/user/client-definition';
  const response = fetch(path, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(clientDefinition),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.then(x => x.json() as Promise<IExtendedClientProfileInfo>);
}