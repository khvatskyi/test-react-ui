// import { delay } from '@epam/uui-test-utils';
import { STATE_CODES } from '../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';

import { IStartChatInfo, /*IInteractiveChatMessage, ChatRole, */ IInteractiveChatContext, IMessageToAi, IContentMessage } from '../typings/models/module.models';
import { fetchWithAuth } from '../utilities/fetch-with-auth.utility';

// const MOCK_DATA = {
//   interactiveChatMessage: {
//     topic: 'test',
//     text: 'test',
//     example: 'test',
//     totalOfQuestions: 5,
//     questionNumber: 1,
//   } as IInteractiveChatMessage,
//   context: {
//     id: 'teslatdsh',
//     name: 'Business insurance quote enablement',
//     description: 'The API Product will enable insurance brokers and agents',
//     history: [
//       {
//         id: '3432y43',
//         createdBy: ChatRole.AI,
//         content: {
//           topic: 'Some Topic',
//           text: 'Some Question',
//           example: 'Some example',
//           totalOfQuestions: 5,
//           questionNumber: 1,
//         } as IInteractiveChatMessage
//       },
//       {
//         id: '323266',
//         createdBy: ChatRole.User,
//         content: {
//           text: 'Insurance brokers and agents require a streamlined process to request quotes from Travelers Insurance quickly and efficiently, reducing the time spent on manual quote requests and improving customer service.'
//         }
//       },
//       {
//         id: '57655fd',
//         createdBy: ChatRole.AI,
//         content: {
//           topic: 'Some Topic 2 ',
//           text: 'Some Question 2',
//           example: 'Some example 2',
//           totalOfQuestions: 5,
//           questionNumber: 2,
//         } as IInteractiveChatMessage
//       }
//     ]
//   } as IInteractiveChatContext
// }

export async function createChat(context: IStartChatInfo, stateCode: STATE_CODES): Promise<IInteractiveChatContext> {

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

export async function getChatContext(portfolio_id: string, state_code: STATE_CODES): Promise<IInteractiveChatContext> {

  // MOCK
  // return Promise.resolve<IInteractiveChatContext>(portfolioId === '2' ? MOCK_DATA.context : null);
  //END of MOCK

  const params = new URLSearchParams({ portfolio_id, state_code }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat?` + params;
  const response = await fetchWithAuth(path, { method: 'GET' });
  const result: IInteractiveChatContext = await response.json();

  return result;
}

export async function sendChatMessage(message: IMessageToAi): Promise<IContentMessage> {

  // MOCK
  // return await delay(1000).then(() => Promise.resolve<IInteractiveChatMessage>({
  //   ...MOCK_DATA.interactiveChatMessage,
  //   questionNumber: message.isLastAnswer ? MOCK_DATA.interactiveChatMessage.totalOfQuestions : MOCK_DATA.interactiveChatMessage.questionNumber
  // }));
  //END of MOCK

  const path = process.env.REACT_APP_API_ROOT + `/interactive-chat`;
  const body = {
    portfolioId: message.portfolioId,
    isLastAnswer: message.isLastAnswer,
    message: message.text,
    stateCode: message.stateCode,
  };

  const response = await fetchWithAuth(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const result: IContentMessage = await response.json();
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
