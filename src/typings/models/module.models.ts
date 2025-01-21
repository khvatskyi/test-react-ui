export interface IStartChatInfo {
  portfolioId?: string;
  name?: string;
  description?: string;
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
  history: IMessage[];
}

export interface IMessage {
  id?: string;
  createdBy: ChatRole;
  content: IInteractiveChatMessage;
}

export interface IMessageToAi {
  context: IInteractiveChatContext;
  text: string;
  portfolioId: string;
  isLastAnswer: boolean;
}

export enum ChatRole {
  AI = 'assistant',
  User = 'user'
}