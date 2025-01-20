import { IAiMessage, IAiResponse, IAiClientDefinitionFillRequest, IAiClientDefinitionFillResponse } from '../typings/models/ai.models';
import { IClientDefinitionInfo, IClientProfileInfo } from '../typings/models/client-info.models';
import { IInteractiveChatMessage } from '../typings/models/module.models';
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

export async function sendValuePropositionChatMessage(message: IAiMessage): Promise<IInteractiveChatMessage> {
  const path = process.env.REACT_APP_API_ROOT + '/assistant/value-proposition/chat';
  const body = {
    portfolioId: message.portfolioId,
    // context: message.context,
    message: message.text
  };

  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const result: IInteractiveChatMessage = await response.json();
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

export async function saveClientDefinition(clientDefinition: IClientDefinitionInfo): Promise<IClientProfileInfo> {

  // MOCK data
  // PROFILE_DATA = {...PROFILE_DATA, ...structuredClone(clientDefinition)};
  // PROFILE_DATA.id = PROFILE_DATA.id ?? crypto.randomUUID();
  // return delay(3000).then(() => Promise.resolve(PROFILE_DATA));

  const path = process.env.REACT_APP_API_ROOT + '/assistant/client-profile/fill';
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(clientDefinition),
  });

  const result: IClientProfileInfo = await response.json();
  return result;
}
