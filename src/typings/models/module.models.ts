import { STATE_CODES } from "../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure";

export interface IStartChatInfo {
  portfolioId: string;
  stateCode: string;
  name?: string;
  description?: string;
}

export interface IEditChatMessage {
  portfolioId: string;
  stateCode: string;
  messageId: string;
  message: string;
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
  summary?: { [key: string]: any };
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

export interface IGetSummaryRequest {
  chatId: string;
  portfolioId: string;
  stateCode: STATE_CODES;
}

export enum ChatRole {
  AI = 'assistant',
  User = 'user'
}