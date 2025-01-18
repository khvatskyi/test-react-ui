import { IApiContext, IValuePropositionChatInfo } from "../typings/models/module.models";
import { fetchWithAuth } from "../utilities/fetch-with-auth.utility";

  
  
export async function startValuePropositionChat(context: IApiContext): Promise<IValuePropositionChatInfo> {
  
  // MOCK
  //  let result = structuredClone(portfolio);
  //
  //  if (result.id) {
  //    const element = MOCK_DATA.find(x => x.id === portfolio.id)!;
  //    element.name = portfolio.name;
  //  } else {
  //    result.id = crypto.randomUUID();
  //    MOCK_DATA.push({ id: result.id, name: portfolio.name });
  //  }
  //
  //  return Promise.resolve(result);
    //END of MOCK
  
    const path = process.env.REACT_APP_API_ROOT + '/assistant/value-proposition/start-chat';
    const response = await fetchWithAuth(path, {
      method: 'POST',
      body: JSON.stringify(context),
    });
  
    const result: IValuePropositionChatInfo = await response.json();
    return result;
  }
