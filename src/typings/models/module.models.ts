import { STATE_CODES } from "../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure";

export interface IApiContext {
  portfolioId: string;
  stateCode: string;
  name?: string;
  description?: string;
}

export interface IStartChat {
  portfolioId: string;
  stateCode: string;
  topic?: string;
}

export interface IEditChatMessage {
  portfolioId: string;
  stateCode: string;
  messageId: string;
  message: string;
  isAiGenerated: boolean;
}

export interface IChatMessageInterviewQuestion {
  topic?: string;
  question?: string;
  example?: string;
  options?: [string];
  totalOfQuestions?: number;
  questionNumber?: number;
}

export interface IChatMessageUserAnswer {
  answer?: string;
  isAiGenerated: boolean;
}

export type IChatMessageAnyContent = 
  IChatMessageInterviewQuestion | 
  IChatMessageUserAnswer

export interface IContentMessage {
  id?: string;
  type: ChatMessageType;
  role: ChatRole;
  content: IChatMessageAnyContent;
}

export interface IInteractiveChatTopic {
  name: string;
  status: string;
  history?: IContentMessage[];
  summary?: { [key: string]: any };
}

export interface IInteractiveChatContext {
  id: string;
  portfolioId: string;
  topics?: IInteractiveChatTopic[];
}

export interface IMessageToAi {
  message: string;
  portfolioId: string;
  isLastAnswer: boolean;
  isAiGenerated: boolean;
  stateCode: string;
}

export interface IGetSummaryRequest {
  chat_id: string;
  portfolio_id: string;
  state_code: STATE_CODES;
}

export interface IGetApiContextRequest {
  portfolio_id: string;
  state_code: STATE_CODES;
}

export enum ChatRole {
  AI = 'assistant',
  User = 'user'
}

export enum ChatMessageType {
  InterviewQuestion = 'interview_question',
  UserAnswer = 'user_answer'
}

export enum TopicStatus {
  New = 'new',
  ActiveDiscussion = 'active',
  Completed = 'completed',
}
