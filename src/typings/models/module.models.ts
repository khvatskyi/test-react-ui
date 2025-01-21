export interface IStartChatInfo {
  portfolioId: string;
  name?: string;
  description?: string;
  stateCode: string;
}

export interface IInteractiveChatMessage {
  topic?: string;
  text?: string;
  example?: string;
  totalOfQuestions?: number;
  questionNumber?: number;
}

export interface IInteractiveChatContext extends IStartChatInfo {
  id: string;
  history: IContentMessage[];
}

export interface IContentMessage {
  id?: string;
  role: ChatRole;
  content: IInteractiveChatMessage;
}

export interface IMessageToAi {
  context: IInteractiveChatContext;
  text: string;
  portfolioId: string;
  isLastAnswer: boolean;
  stateCode: string;
}

export enum ChatRole {
  AI = 'assistant',
  User = 'user'
}