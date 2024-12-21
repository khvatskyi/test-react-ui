import { IAiMessage, IAiResponse, IAiClientDefinitionFillRequest, IAiClientDefinitionFillResponse } from '../models/ai.models';
import { concatMap, from, map, Observable} from 'rxjs';

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
