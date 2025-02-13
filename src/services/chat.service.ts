// import { delay } from '@epam/uui-test-utils';
import { STATE_CODES } from '../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';

import { IApiContext, IStartChat, IInteractiveChatContext, IMessageToAi, IContentMessage, IEditChatMessage, IGetSummaryRequest, IGetApiContextRequest} from '../typings/models/module.models';
import { IGetScenarioDetailsRequest, IProductJourney, IScenarioDetails, IUpdateApiProductJourneyAction, IUpdateApiProductJourneyStep } from '../typings/models/product-journey.model';
import { fetchWithAuth } from '../utilities/fetch-with-auth.utility';
// import { SUMMARY } from '../constants';

// const MOCK_DATA = {
//   interactiveChatMessage: {
//     id: '1',
//     topic: 'test',
//     text: 'test',
//     example: 'test',
//     totalOfQuestions: 5,
//     questionNumber: 1,
//   } as IChatMessageInterviewQuestion,
//   context: {
//     id: 'teslatdsh',
//     name: 'Business insurance quote enablement',
//     description: 'The API Product will enable insurance brokers and agents',
//     history: [
//       {
//         id: '3432y43',
//         role: ChatRole.AI,
//         content: {
//           id: '2',
//           topic: 'Some Topic',
//           text: 'Some Question',
//           example: 'Some example',
//           totalOfQuestions: 5,
//           questionNumber: 1,
//         } as IChatMessageInterviewQuestion
//       },
//       {
//         id: '323266',
//         role: ChatRole.User,
//         content: {
//           id: '3',
//           text: 'Insurance brokers and agents require a streamlined process to request quotes from Travelers Insurance quickly and efficiently, reducing the time spent on manual quote requests and improving customer service.'
//         }
//       },
//       {
//         id: '57655fd',
//         role: ChatRole.AI,
//         content: {
//           id: '4',
//           topic: 'Some Topic 2 ',
//           text: 'Some Question 2',
//           example: 'Some example 2',
//           totalOfQuestions: 5,
//           questionNumber: 2,
//         } as IChatMessageInterviewQuestion
//       }
//     ]
//   } as IInteractiveChatContext
// }

export async function startChat(context: IStartChat): Promise<IInteractiveChatContext> {

  // MOCK
  // return Promise.resolve<IInteractiveChatContext>(MOCK_DATA.context);
  //END of MOCK

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/start`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(context),
  });

  return await response.json();
}

export async function initChatTopic(context: IApiContext): Promise<IInteractiveChatContext> {

  // MOCK
  // return Promise.resolve<IInteractiveChatContext>(MOCK_DATA.context);
  //END of MOCK

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/init`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(context),
  });

  return await response.json();
}

export async function getChatContext(portfolio_id: string, state_code: STATE_CODES): Promise<IInteractiveChatContext> {

  // MOCK
  // return Promise.resolve<IInteractiveChatContext>(portfolio_id === '2' ? MOCK_DATA.context : null);
  //END of MOCK

  const params = new URLSearchParams({ portfolio_id, state_code }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });
  const result: IInteractiveChatContext = await response.json();

  return result;
}

export async function sendChatMessage(message: IMessageToAi): Promise<IContentMessage[]> {

  // MOCK
  // return await delay(1000).then(() => Promise.resolve<IContentMessage[]>(message.isLastAnswer ? [
  //   {
  //     id: '3erew3',
  //     role: ChatRole.User,
  //     content: {
  //       text: message.text,
  //       questionNumber: MOCK_DATA.interactiveChatMessage.totalOfQuestions,
  //       totalOfQuestions: MOCK_DATA.interactiveChatMessage.totalOfQuestions,
  //     }
  //   }
  // ] : [
  //   {
  //     id: '3erew',
  //     role: ChatRole.User,
  //     content: {
  //       text: message.text,
  //       questionNumber: MOCK_DATA.interactiveChatMessage.totalOfQuestions - 1,
  //       totalOfQuestions: MOCK_DATA.interactiveChatMessage.totalOfQuestions,
  //     }
  //   },
  //   {
  //     id: '3erew',
  //     role: ChatRole.AI,
  //     content: { ...MOCK_DATA.interactiveChatMessage, questionNumber: MOCK_DATA.interactiveChatMessage.totalOfQuestions }
  //   }
  // ]));
  //END of MOCK

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat`;
  const body = {
    portfolioId: message.portfolioId,
    isLastAnswer: message.isLastAnswer,
    isAiGenerated: message.isAiGenerated,    
    message: message.message,
    stateCode: message.stateCode,
  };

  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const result: IContentMessage[] = await response.json();
  return result;
}

export async function deleteChat(portfolio_id: string, state_code: STATE_CODES): Promise<void> {

  // MOCK
  // return await delay(1000).then(() => Promise.resolve());
  //END of MOCK

  const params = new URLSearchParams({ portfolio_id, state_code }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat?` + params;
  const response = await fetchWithAuth(path, { method: 'DELETE' });

  return await response.json();
}

export async function editChatMessage(message: IEditChatMessage): Promise<void> {

  // return await Promise.resolve();

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/edit`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(message),
  });

  return await response.json();
}

export async function getChatSummary(request: IGetSummaryRequest): Promise<{ [key: string]: any }> {

  // return await delay(1000).then(() => Promise.resolve(SUMMARY));

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/summary?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}

export async function getChatApiContext(request: IGetApiContextRequest): Promise<IApiContext> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/api-context?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}

export async function getScenarioDetails(request: IGetScenarioDetailsRequest): Promise<IScenarioDetails> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/scenario-details?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}


export async function sendScenarioDetailsMessage(portfolioId: string): Promise<IScenarioDetails> {

  const path = process.env.REACT_APP_API_ROOT + '/interactive-chat/scenario-details/fill';
  const body = {
    portfolioId: portfolioId
  };

  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return response.json();
}

export async function initApiProductJourneyReguest(request: IScenarioDetails): Promise<IProductJourney> {

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/api-product-journey`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  const result: IProductJourney = await response.json();
  return result;
}


export async function getApiProductJourneyReguest(request: IGetScenarioDetailsRequest): Promise<IProductJourney> {

  const params = new URLSearchParams({ ...request }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/api-product-journey?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });

  const result = await response.json();
  return result; 
}


export async function updateStepApiProductJourneyReguest(request: IUpdateApiProductJourneyStep): Promise<void> {

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/api-product-journey/update-step`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return await response.json();
}


export async function updateActionApiProductJourneyReguest(request: IUpdateApiProductJourneyAction): Promise<void> {

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat/api-product-journey/update-action`;
  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return await response.json();
}

