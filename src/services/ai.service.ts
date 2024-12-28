import { concatMap, from, map, Observable} from 'rxjs';
import { IAiMessage, IAiResponse, IAiClientDefinitionFillRequest, IAiClientDefinitionFillResponse } from '../models/ai.models';
import { IClientDefinitionInfo, IClientProfileInfo } from '../pages/client-profile/ClientProfile.models';


export function sendMessage(message: IAiMessage): Observable<IAiResponse> {

  const path = process.env.REACT_APP_API_ROOT + '/chat/message';
  const body = {
    context: message.context,
    message: message.text
  };

  const response = fetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return from(response).pipe(
    concatMap(x => x.json()),
    map((result: { message: string }) => {
      return {
        message: result.message,
      } as IAiResponse
    })
  );

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

  const response = await fetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {      
      throw new Error(response.statusText, {cause: {
        body: await response.json(),
        response: response
      }});
  }
  return response.json()

}

export async function saveClientDefinition(clientDefinition: IClientDefinitionInfo): Promise<IClientProfileInfo> {

  // MOCK data
  // PROFILE_DATA = {...PROFILE_DATA, ...structuredClone(clientDefinition)};
  // PROFILE_DATA.id = PROFILE_DATA.id ?? crypto.randomUUID();
  // return delay(3000).then(() => Promise.resolve(PROFILE_DATA));

  const path = process.env.REACT_APP_API_ROOT + '/assistant/client-profile/fill';
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(clientDefinition),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {      
    throw new Error(response.statusText, {cause: {
      body: await response.json(),
      response: response
    }});
  }

  const result: IClientProfileInfo = await response.json();
  return result;
}
