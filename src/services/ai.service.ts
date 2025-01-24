// import { delay } from '@epam/uui-test-utils';
import { IAiMessage, IAiResponse, IAiClientDefinitionFillRequest, IAiClientDefinitionFillResponse} from '../typings/models/ai.models';
import { IClientDefinitionInfo, IClientProfileInfo } from '../typings/models/client-info.models';
import { fetchWithAuth } from '../utilities/fetch-with-auth.utility';

export async function sendMessage(message: IAiMessage): Promise<IAiResponse> {

  const path = process.env.REACT_APP_API_ROOT + '/chat/message';
  const body = {
    context: message.context,
    message: message.text
  };

  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const result: IAiResponse = await response.json();
  return result;
}

export async function sendClientDefinitionFillMessage(message: IAiClientDefinitionFillRequest): Promise<IAiClientDefinitionFillResponse> {

  // MOCK DATA. Comment the code above and uncomment the code below:

  // const response: IAiResponse = {
  //     message: 'Test message lorem ipsum how are you doing? Hey my name is ni pro sho.',
  //     options: [
  //         { name: 'How do you envision AI-driven project management tools transforming the way you plan, execute, and monitor projects?' },
  //         { name: 'What challenges do you foresee in integrating AI into your current project management workflows, and how do you plan to address them?' },
  //         // { name: 'test' }
  //     ]
  // }
  // return of(response).pipe(delay(500));
  
  const path = process.env.REACT_APP_API_ROOT + '/assistant/client-definition/fill';
  const body = {
    name: message.name ? message.name : ''
  };

  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return response.json()

}

// let PROFILE_DATA: IClientProfileInfo = {
//   name: 'Travelers',
//   description: 'Travelers Insurance is one of the largest and most established insurance companies in the United States, providing a wide array of property and casualty insurance products and services to businesses, organizations, and individuals. Founded in 1864, Travelers has built a reputation for financial strength, stability, and handling claims efficiently and fairly. The company focuses on innovation and comprehensive risk management to cater to the changing needs of its clients.',
//   industry: '13',
//   size: 'Large',
//   coreProducts: '',
//   strengths: ['Financial strength', 'Stability', 'Efficient claims handling'],
//   competitiveEdge: 'Focus on innovation and comprehensive risk management',
//   marketPosition: 'One of the largest and most established insurance companies in the US',
//   headquarters: '',
//   primaryLocations: null,
//   website: 'https://www.travelers.com',
//   linkedIn: 'https://linkedin.com/company/travelers',
//   twitter: 'https://twitter.com/travelers',
//   facebook: 'https://www.facebook.com/Travelers',
//   otherSocialMedia: null,
// }

export async function saveClientDefinition(clientDefinition: IClientDefinitionInfo): Promise<IClientProfileInfo> {

  // MOCK data
  // PROFILE_DATA = {...PROFILE_DATA, ...structuredClone(clientDefinition)};
  // return delay(2000).then(() => Promise.resolve(PROFILE_DATA));

  const path = process.env.REACT_APP_API_ROOT + '/assistant/client-profile/fill';
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(clientDefinition),
  });

  const result: IClientProfileInfo = await response.json();
  return result;
}
